import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import styles from './about.styles';
import { aboutTimeline, aboutSections } from '../../assets';
import { Timeline, TimelineSection, TimelineSections } from '../../components';
import { AboutUs } from './components';

import { TIMELINE_MAX_WIDTH } from '../../components/_lib/styles/timeline.styles';
import '../../../node_modules/video-react/dist/video-react.css';

/**
 * About - Container 'Quem Somos'
 *
 * @export
 * @class About
 * @extends {Component}
 */
class About extends Component {
  state = {
    timelineWidth: TIMELINE_MAX_WIDTH,
    shouldFixTimeline: false,
    expanded: Boolean(this.props.location.hash),
    aboutUsHeight: window.innerHeight - 96
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    const context = this;
    
    window.addEventListener('resize', () => {
      const timelineWidth = document.querySelector('#side-timeline').clientWidth;
      const availableWidth = window.innerWidth - timelineWidth - 16;
      const aboutUsHeight = window.innerHeight - 96;

      context.setState({ timelineWidth, availableWidth, aboutUsHeight });
    });
    
    window.addEventListener('scroll', () => {
      const offset = document.querySelector('#timeline-sections').offsetTop;
      const htmlScroll = document.querySelector('html').scrollTop;
      const bodyScroll = document.querySelector('body').scrollTop;
      const { shouldFixTimeline } = context.state;
      
      if((bodyScroll >= offset || htmlScroll >= offset) && !shouldFixTimeline)
      context.setState({ shouldFixTimeline: true });
      if((bodyScroll <= offset && htmlScroll <= offset) && shouldFixTimeline)
      context.setState({ shouldFixTimeline: false });
    });

    if(!this.state.expanded) {
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('html').style.overflow = 'hidden';
    }
    
    const timelineWidth = document.querySelector('#side-timeline').clientWidth;
    const availableWidth = window.innerWidth - timelineWidth - 16;
    const aboutUsHeight = window.innerHeight - 96;

    this.setState({ timelineWidth, availableWidth, aboutUsHeight });

    if(this.props.location.hash) {
      const el = document.querySelector(this.props.location.hash);
      if(el) window.scrollTo(el.offsetLeft, el.offsetTop);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.expanded && !prevState.expanded) {
      document.querySelector('body').style.overflow = 'auto';
      document.querySelector('html').style.overflow = 'auto';
    }
  }
  
  _renderTimelineSections() {
    return aboutSections.map(item => {
      return (
        <TimelineSection id={item.id}>
          {item.label}
        </TimelineSection>
      )
    });
  }

  _handleExpand() {
    if(!this.state.expanded) this.setState({ expanded: true });
    window.scrollTo(0, document.querySelector('#timeline-sections').offsetTop);
  }

  render() {
    const { classes, history } = this.props;
    const { availableWidth, timelineWidth, shouldFixTimeline, aboutUsHeight } = this.state;

    return (
      <div className={classes.wrapper}>
        <AboutUs height={aboutUsHeight} expandAction={this._handleExpand.bind(this)} />
        <div className='timeline'>
          <Timeline fixed={shouldFixTimeline} history={history} content={aboutTimeline} />
          <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            {this._renderTimelineSections()}
          </TimelineSections>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(About);