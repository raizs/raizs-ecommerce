import React from 'react'
import { withStyles, Icon } from '@material-ui/core';

import { Player, ControlBar, BigPlayButton } from 'video-react';
import { aboutUsInfoText } from '../../../../assets';

const styles = theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`,
    maxHeight: '90vh'
  },
  title: {
    ...theme.typography.timelineSectionTitle,
    paddingTop: 4 * theme.spacing.unit
  },
  info: {
    ...theme.typography.infoText,
    textAlign: 'center',
    margin: `${5 * theme.spacing.unit}px 0`,
  },
  player: {
    backgroundColor: 'transparent !important'
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, .5) !important',
    height: '100px !important',
    width: '100px !important',
    top: '0 !important',
    bottom: '0 !important',
    left: '0 !important',
    right: '0 !important',
    margin: 'auto !important',
    borderRadius: '50% !important',
    borderWidth: '0 !important',
    '&:before': {
      fontSize: '80px',
      marginTop: '28px'
    }
  },
  expand: {
    cursor: 'pointer',
    fontSize: 48
  }
});

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