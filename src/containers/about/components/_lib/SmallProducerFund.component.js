import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core';

import { smallFundProducerInfoText } from '../../../../assets';
import { Player, BigPlayButton } from 'video-react';

const styles = theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  title: {
    ...theme.typography.timelineSectionTitle,
  },
  bigTitle: {
    ...theme.typography.bigTitle
  },
  content: {
    margin: `${6 * theme.spacing.unit}px 0 ${15 * theme.spacing.unit}px 0`,
    '& > div, > p': {
      width: '50%',
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: `0 ${2 * theme.spacing.unit}px`
    }
  },
  info: {
    ...theme.typography.infoText,
  },
  player: {
    backgroundColor: 'transparent !important'
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, .5) !important',
    height: '64px !important',
    width: '64px !important',
    top: '0 !important',
    bottom: '0 !important',
    left: '0 !important',
    right: '0 !important',
    margin: 'auto !important',
    borderRadius: '50% !important',
    borderWidth: '0 !important',
    '&:before': {
      fontSize: '48px',
      marginTop: '10px'
    }
  }
});

let SmallProducerFund = ({ classes, id }) => {

  return (
    <div id={id} className={classnames(classes.wrapper, 'offset-important')}>
      <h4 className={classes.title}>
        FUNDO DO PEQUENO PRODUTOR
      </h4>
      <h2 className={classes.bigTitle}>
        Nossa abordagem ética
      </h2>
      <div className={classes.content}>
        <div>
          <Player
            className={classes.player}
            src='http://techslides.com/demos/sample-videos/small.webm'
          >
            <BigPlayButton className={classes.playButton} position='center' />
          </Player>
        </div>
        <p className={classes.info}>{smallFundProducerInfoText}</p>
      </div>
    </div>
  );
}

SmallProducerFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

SmallProducerFund = withStyles(styles)(SmallProducerFund);

export { SmallProducerFund };