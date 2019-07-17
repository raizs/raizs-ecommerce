import React from 'react'
import { TIMELINE_MAX_WIDTH } from '../../components/_lib/Timeline.component';

const defaultOptions = {
  sectionsOffset: 0,
  sectionOffset: 0,
  padding: 0
};

const withTimeline = (options = defaultOptions) => WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        initialScroll: false,
        timelineData: {
          availableWidth: 1024 - TIMELINE_MAX_WIDTH,
          timelineWidth: TIMELINE_MAX_WIDTH,
          shouldFixTimeline: false,
          offsets: [],
          currentSectionId: ''
        }
      }
    }
    
    componentDidMount() {
      const context = this;
      
      window.addEventListener('resize', e => this._timelineResizeEvent(e, context));
      window.addEventListener('scroll', e => this._timelineScrollEvent(e, context));

      const timeline = document.querySelector('#side-timeline')
      let timelineWidth = 0;
      if (timeline)
        timelineWidth = timeline.clientWidth;
      const availableWidth = window.innerWidth - timelineWidth - (2 * options.padding);
      const { shouldFixTimeline } = this.state.timelineData;

      const sections = document.querySelectorAll('.timeline-section div.offset-important');
      const offsets = [...sections].map(section => ({
        value: section.offsetTop + options.sectionOffset,
        id: section.id
      }));

      const timelineData = { timelineWidth, availableWidth, shouldFixTimeline, offsets };

      this.setState({ timelineData });
    }
    
    componentDidUpdate(prevProps, prevState) {
      if(this.props.location && this.props.location.hash && !prevState.initialScroll) {
        const el = document.querySelector(this.props.location.hash);
        if(el) window.scrollTo(el.offsetLeft, el.offsetTop);
        this.setState({ initialScroll: true });
      }
    }
    
    _timelineResizeEvent = (e, context) => {
      
      const timeline = document.querySelector('#side-timeline')
      let timelineWidth = 0;
      if (timeline)
        timelineWidth = timeline.clientWidth;
      const availableWidth = window.innerWidth - timelineWidth - (2 * options.padding);
      const { shouldFixTimeline } = context.state;

      const timelineData = { availableWidth, timelineWidth, shouldFixTimeline };
    
      context.setState({ timelineData });
    };
    
    _timelineScrollEvent = (e, context) => {
      const timelineSections = document.querySelector('#timeline-sections');
      const offset = timelineSections ? timelineSections.offsetTop + options.sectionsOffset : 0;
      const top = timelineSections ? timelineSections.getBoundingClientRect().top : 0;
      const htmlScroll = document.querySelector('html').scrollTop;
      const bodyScroll = document.querySelector('body').scrollTop;
      const scroll = htmlScroll || bodyScroll;
      const { shouldFixTimeline, currentSectionId } = context.state.timelineData;
      const sections = document.querySelectorAll('div.offset-important');
      const offsets = [...sections].map(section => ({
        value: section.offsetTop + options.sectionOffset,
        id: section.id
      }));
      // if(timelineSections) console.log(scroll, timelineSections.getBoundingClientRect())
      
      const { timelineData } = context.state;
      let shouldSetState = false;
      
      // should fix timeline logic
      if(top <= 0 && !shouldFixTimeline) {
        timelineData.shouldFixTimeline = true;
        shouldSetState = true;
      }
      if(top > 0 && shouldFixTimeline) {
        timelineData.shouldFixTimeline = false;
        shouldSetState = true;
      }
      
      let currentWindowId = '';
      for(let i in offsets) {
        i = parseInt(i);
        if(offsets[i].value <= (scroll - offset) && offsets[i+1] && offsets[i + 1].value > (scroll - offset)) {
          currentWindowId = offsets[i].id;
          break;
        }
        else if(offsets[i] && !offsets[i+1] && (scroll - offset) >= offsets[i].value) {
          currentWindowId = offsets[i].id;
          break;
        }
      }

      if(currentWindowId !== currentSectionId) {
        timelineData.currentSectionId = currentWindowId;
        shouldSetState = true;
      }

      if(shouldSetState) context.setState({ timelineData });
    };

    componentWillUnmount() {
      window.removeEventListener('scroll', this._timelineScrollEvent);
      window.removeEventListener('resize', this._timelineResizeEvent);
    }
  
    render() {
      return <WrappedComponent {...this.state.timelineData} {...this.props} />
    }
  }
}

export { withTimeline };