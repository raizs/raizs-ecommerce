import React from 'react'
import { withStyles, Icon } from '@material-ui/core';

import { Player, ControlBar, BigPlayButton } from 'video-react';
import { aboutUsInfoText } from '../../../../assets';

import styles from './styles/aboutUs.styles';

let AboutUs = ({ classes, height, expandAction }) => {
  return (
    <div id='sobre' className={classes.wrapper} style={{ height }}>
      <h4 className={classes.title}>QUEM SOMOS</h4>
      <Player
        width='100%'
        height={height - 250}
        fluid={false}
        className={classes.player}
        src='http://techslides.com/demos/sample-videos/small.webm'
      >
        <BigPlayButton className={classes.playButton} position='center' />
        <ControlBar />
      </Player>
      <p className={classes.info}>{aboutUsInfoText}</p>
      <div style={{ textAlign: 'center' }}>
        <Icon onClick={expandAction} className={classes.expand}>expand_more</Icon>
      </div>
    </div>
  )
}

AboutUs = withStyles(styles)(AboutUs);

export { AboutUs };