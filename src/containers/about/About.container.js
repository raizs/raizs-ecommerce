import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

import { aboutTimeline, aboutSections } from '../../assets';
import { Timeline, TimelineSection, TimelineSections } from '../../components';
import { AboutUs, Ethics, WhyOrganics, SmallProducerFund } from './components';

import '../../../node_modules/video-react/dist/video-react.css';

import { withTimeline } from '../withTimeline';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    userSelect: 'none'
  }
});

/**
 * About - Container 'Quem Somos'
 *
 * @export
 * @class About
 * @extends {Component}
 */
class About extends Component {
  state = {
    expanded: Boolean(this.props.location.hash),
    aboutUsHeight: window.innerHeight - 96,
    initialScroll: false
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    document.title = 'Raízs | Sobre';
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
          <Comp id={item.id} />
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
    const {
      classes,
      history,
      availableWidth,
      timelineWidth,
      shouldFixTimeline,
      currentSectionId
    } = this.props;
    const { aboutUsHeight } = this.state;

    return (
      <div className={classes.wrapper}>
        <AboutUs height={aboutUsHeight} expandAction={this._handleExpand.bind(this)} />
        <div>
          <Timeline
            history={history}
            content={aboutTimeline}
            fixed={shouldFixTimeline}
            currentSectionId={currentSectionId}
          />
          <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            {this._renderTimelineSections()}
          </TimelineSections>
        </div>
      </div>
    )
  }
}

export default compose(
  withTimeline,
  withStyles(styles)
)(About);