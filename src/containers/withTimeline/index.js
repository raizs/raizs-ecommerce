import React from 'react'
import { TIMELINE_MAX_WIDTH } from '../../components/_lib/Timeline.component';

const withTimeline = WrappedComponent => {
  return class extends React.Component {
    state = {
      initialScroll: false,
      timelineData: {
        availableWidth: 1024 - TIMELINE_MAX_WIDTH,
        timelineWidth: TIMELINE_MAX_WIDTH,
        shouldFixTimeline: false
      }
    }
    
    componentDidMount() {
      const context = this;
      
      window.addEventListener('resize', e => this._timelineResizeEvent(e, context));
      window.addEventListener('scroll', e => this._timelineScrollEvent(e, context));

      const timelineWidth = document.querySelector('#side-timeline').clientWidth;
      const availableWidth = window.innerWidth - timelineWidth - 16;
      const { shouldFixTimeline } = this.state.timelineData;

      const timelineData = { timelineWidth, availableWidth, shouldFixTimeline };

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
      const { shouldFixTimeline } = context.state.timelineData;

      const { timelineData } = context.state;

      if((bodyScroll >= offset || htmlScroll >= offset) && !shouldFixTimeline) {
        timelineData.shouldFixTimeline = true;
        context.setState({ timelineData });
      }
      if((bodyScroll <= offset && htmlScroll <= offset) && shouldFixTimeline) {
        timelineData.shouldFixTimeline = false;
        context.setState({ timelineData });
      }
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