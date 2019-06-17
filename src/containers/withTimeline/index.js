import React from 'react'
import { TIMELINE_MAX_WIDTH } from '../../components/_lib/Timeline.component';

const withTimeline = WrappedComponent => {
  return class extends React.Component {
    state = {
      initialScroll: false,
      timelineData: {
        availableWidth: 1024 - TIMELINE_MAX_WIDTH,
        timelineWidth: TIMELINE_MAX_WIDTH,
        shouldFixTimeline: false,
        offsets: [],
        currentSectionId: ''
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
      const availableWidth = window.innerWidth - timelineWidth - 16;
      const { shouldFixTimeline } = this.state.timelineData;

      const sections = document.querySelectorAll('.timeline-section div.offset-important');
      const offsets = [...sections].map(section => ({ value: section.offsetTop, id: section.id }));

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
      const timelineWidth = document.querySelector('#side-timeline').clientWidth;
      const availableWidth = window.innerWidth - timelineWidth - 16;
      const { shouldFixTimeline } = context.state;

      const timelineData = { availableWidth, timelineWidth, shouldFixTimeline };
    
      context.setState({ timelineData });
    };
    
    _timelineScrollEvent = (e, context) => {
      const timelineSections = document.querySelector('#timeline-sections');
      const offset = timelineSections ? timelineSections.offsetTop : 0;
      const htmlScroll = document.querySelector('html').scrollTop;
      const bodyScroll = document.querySelector('body').scrollTop;
      const scroll = htmlScroll || bodyScroll;
      const { shouldFixTimeline, currentSectionId } = context.state.timelineData;
      const sections = document.querySelectorAll('div.offset-important');
      const offsets = [...sections].map(section => ({value: section.offsetTop, id: section.id}));
      
      const { timelineData } = context.state;
      let shouldSetState = false;
      
      if(scroll >= offset && !shouldFixTimeline) {
        timelineData.shouldFixTimeline = true;
        shouldSetState = true;
      }
      if(scroll <= offset && shouldFixTimeline) {
        timelineData.shouldFixTimeline = false;
        shouldSetState = true;
      }
      
      let currentWindowId = '';
      for(let i in offsets) {
        i = parseInt(i);
        if(offsets[i].value <= scroll && offsets[i+1] && offsets[i + 1].value > scroll) {
          currentWindowId = offsets[i].id;
          break;
        }
        else if(offsets[i] && !offsets[i+1] && scroll >= offsets[i].value) {
          currentWindowId = offsets[i].id;
          break;
        }
      }

      if(currentWindowId !== currentSectionId) {
        timelineData.currentSectionId = currentWindowId;
        shouldSetState = true;
        document.location.hash = currentWindowId ? `#${currentWindowId}_` : '';
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