import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/smallProducerFund.styles'
import { withStyles } from '@material-ui/core';

import { smallFundProducerInfoText } from '../../../../assets';
import { Player, BigPlayButton } from 'video-react';

let SmallProducerFund = ({ classes }) => {

  return (
    <div className={classes.wrapper}>
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
      <div className={classes.toRemove}></div>
    </div>
  );
}

SmallProducerFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

SmallProducerFund = withStyles(styles)(SmallProducerFund);

export { SmallProducerFund };