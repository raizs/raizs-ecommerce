import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import { aboutTimeline, aboutSections } from '../../assets';
import { Timeline, TimelineSection, TimelineSections } from '../../components';
import { AboutUs, Ethics, WhyOrganics, SmallProducerFund } from './components';

import { TIMELINE_MAX_WIDTH } from '../../components/_lib/styles/timeline.styles';
import '../../../node_modules/video-react/dist/video-react.css';

import styles from './about.styles';

const _resizeEvent = context => {
  const timelineWidth = document.querySelector('#side-timeline').clientWidth;
  const availableWidth = window.innerWidth - timelineWidth - 16;
  const aboutUsHeight = window.innerHeight - 96;

  context.setState({ timelineWidth, availableWidth, aboutUsHeight });
};

const _scrollEvent = context => {
  const timeline = document.querySelector('#timeline-sections');
  const offset = timeline ? timeline.offsetTop : 0;
  const htmlScroll = document.querySelector('html').scrollTop;
  const bodyScroll = document.querySelector('body').scrollTop;
  const { shouldFixTimeline } = context.state;
  
  if((bodyScroll >= offset || htmlScroll >= offset) && !shouldFixTimeline)
  context.setState({ shouldFixTimeline: true });
  if((bodyScroll <= offset && htmlScroll <= offset) && shouldFixTimeline)
  context.setState({ shouldFixTimeline: false });
};

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
    aboutUsHeight: window.innerHeight - 96,
    initialScroll: false
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    const context = this;
    
    window.addEventListener('resize', () => _resizeEvent(context));
    
    window.addEventListener('scroll', () => _scrollEvent(context));

    if(!this.state.expanded) {
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('html').style.overflow = 'hidden';
    }
    
    const timelineWidth = document.querySelector('#side-timeline').clientWidth;
    const availableWidth = window.innerWidth - timelineWidth - 16;
    const aboutUsHeight = window.innerHeight - 96;

    this.setState({ timelineWidth, availableWidth, aboutUsHeight });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.expanded && !prevState.expanded) {
      document.querySelector('body').style.overflow = 'auto';
      document.querySelector('html').style.overflow = 'auto';
    }
    if(this.props.location.hash && !prevState.initialScroll) {
      const el = document.querySelector(this.props.location.hash);
      if(el) window.scrollTo(el.offsetLeft, el.offsetTop);
      this.setState({ initialScroll: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _scrollEvent);
    window.removeEventListener('resize', _resizeEvent);
  }

  /**
   * _renderTimelineSections - renders the correct section based on the
   * section id
   *
   * @returns
   * @memberof About
   */
  _renderTimelineSections() {
    return aboutSections.map(item => {
      const Comp = {
        'fundo': SmallProducerFund,
        'organicos': WhyOrganics,
        'etica-transparencia': Ethics
      }[item.id];

      return Comp ? (
        <TimelineSection key={item.id} id={item.id}>
          <Comp />
        </TimelineSection>
      ) : <div>component not found</div>;
    });
  }

  /**
   * _handleExpand - handles the screen expand action
   *
   * @memberof About
   */
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
        <div>
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