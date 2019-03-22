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
          Donec nec ante ante. In pellentesque dolor sit amet nisi auctor facilisis. Integer dictum lorem et nisi ullamcorper pretium. Nunc suscipit augue ac congue laoreet. Suspendisse mi nulla, sodales ac lectus sit amet, bibendum pharetra mi. Aliquam erat volutpat. Proin imperdiet elit vitae dolor fermentum auctor. Maecenas aliquet odio a metus pellentesque, sit amet faucibus enim aliquet. Mauris consectetur augue sed imperdiet tempor. Morbi ut vestibulum libero. Nam nec lacinia nibh. Vivamus condimentum urna porta consectetur fringilla.

Nam at erat a tortor laoreet tempus ut sed risus. Cras enim risus, hendrerit id ullamcorper faucibus, ornare et ligula. Aliquam porttitor efficitur nisi. Nullam pharetra nisl at turpis facilisis dignissim. Duis porttitor tincidunt laoreet. Morbi sodales laoreet metus consectetur vestibulum. Donec vel elementum massa. Integer bibendum nisl id mollis consequat. Suspendisse commodo ornare dolor, et venenatis augue pharetra ut. Phasellus sodales ex a cursus blandit. Vestibulum ut quam pretium, commodo nisl eget, feugiat ex. Etiam faucibus lectus quis fermentum porta. Nulla et arcu et ex aliquet maximus. Integer vel massa at tellus molestie scelerisque sed at tortor. Quisque lacus mauris, ultrices id risus elementum, rhoncus pretium diam. Morbi sed sem in nulla molestie mollis.

Quisque ullamcorper consectetur sem a condimentum. Sed pellentesque porttitor risus, vel maximus sapien. Phasellus euismod, metus id congue imperdiet, odio justo pretium velit, in eleifend tortor risus eu est. Fusce cursus eros vitae odio gravida, vel interdum nisl feugiat. Phasellus molestie ex ut quam porttitor dapibus a ac turpis. Nullam in enim in metus convallis dictum quis at turpis. Vestibulum lacinia nibh in pellentesque vestibulum. Phasellus vitae dictum mauris. Maecenas ac luctus turpis, id gravida metus. Etiam dolor ipsum, porttitor et diam gravida, interdum tempor nunc. Suspendisse nec metus rhoncus, malesuada odio sit amet, euismod dui. Pellentesque sed quam magna.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam ac fermentum nisl. Donec maximus non urna a cursus. Suspendisse purus lorem, porta eu eros vitae, finibus pulvinar velit. Sed blandit orci varius eros commodo lobortis. Praesent sed venenatis mauris. Aliquam sed mi ut erat commodo volutpat. Nam ultricies turpis vel varius mollis. Proin eget mollis erat. Fusce vitae dignissim risus, nec commodo nulla. Nunc pharetra augue a ligula sagittis gravida. Maecenas luctus urna pellentesque enim scelerisque laoreet. Nunc non fringilla elit. Cras elementum eu lectus eu tempor. Nullam lobortis, quam eu finibus gravida, quam eros volutpat enim, vel scelerisque turpis ante nec sem.

Duis ullamcorper a odio eget elementum. Quisque odio est, interdum quis nunc ut, faucibus congue ex. Vivamus cursus risus sed quam dignissim viverra nec eget leo. Donec efficitur, ipsum eu fringilla placerat, mi ex convallis felis, vitae dictum nunc ipsum non ipsum. Curabitur laoreet iaculis est, sed efficitur erat elementum nec. Proin faucibus elit quis urna sagittis, vitae gravida dui bibendum. Maecenas commodo risus id massa pharetra viverra. Ut ultrices suscipit venenatis. Pellentesque ex sem, luctus cursus massa eget, tempus tempus nisl. Aenean pulvinar nisl sit amet diam aliquet vestibulum. Aenean suscipit turpis quis tortor placerat ultricies. Maecenas a felis sed quam pulvinar interdum id blandit lectus. Nullam dapibus blandit sem ut faucibus. Proin pharetra id ante ac condimentum. Morbi eget tincidunt ante, in sodales magna. Nulla quis turpis fringilla odio feugiat dictum.

Sed convallis est id nunc porttitor tincidunt. Maecenas sit amet neque lectus. Maecenas volutpat metus sed nunc ultrices, sed lacinia diam cursus. Praesent nec neque sagittis, blandit dolor quis, auctor nibh. Suspendisse congue sagittis mauris, et aliquam ex posuere ut. Maecenas feugiat blandit augue, nec dictum sapien convallis sit amet. Nam rhoncus, ligula vel aliquam convallis, quam magna aliquet nisi, sit amet mollis lectus mi eget ante. Vivamus pulvinar nulla ut tortor consectetur, in maximus odio pellentesque. Cras congue, nibh ultrices tincidunt maximus, velit augue consequat felis, vitae facilisis sem mi eu diam. Integer libero sapien, commodo eu metus sit amet, fermentum laoreet turpis. Nunc sed viverra mi. Proin pulvinar vestibulum sagittis. Vestibulum suscipit porta porta. Integer consequat viverra fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse interdum eget nunc non ultrices.

Vestibulum at massa vitae sem tempor venenatis. Duis eu orci at leo gravida bibendum ac quis metus. Nam aliquam metus turpis, in sagittis turpis lobortis eu. Vestibulum non eros congue, varius neque vitae, mattis leo. Aenean non odio vel quam consequat semper a malesuada neque. In posuere faucibus velit, vel interdum orci tincidunt a. Aliquam erat volutpat. Mauris in velit consectetur, scelerisque metus nec, faucibus nisi. Morbi orci enim, accumsan non massa tristique, rutrum tincidunt augue. Pellentesque tincidunt convallis mi ut sollicitudin. Etiam dignissim orci enim, non viverra ex vulputate a. Nullam eget ligula cursus, interdum quam sit amet, semper nisi. Duis convallis laoreet velit, eget laoreet leo pretium non. Praesent efficitur quam ut lacus vehicula malesuada.
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

    console.log(this.state)

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