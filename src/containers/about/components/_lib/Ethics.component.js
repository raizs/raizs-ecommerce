import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/ethics.styles'
import { withStyles } from '@material-ui/core';
import { ethicsInfoText } from '../../../../assets';

let Ethics = ({ classes }) => {

  return (
    <div className={classes.wrapper}>
      <h4 className={classes.title} >
        ÉTICA E TRANSPARÊNCIA
      </h4>
      <h2 className={classes.bigTitle}>
        Sustentável e transparente
      </h2>
      <p className={classes.info}>
        {ethicsInfoText}
      </p>
    </div>
  );
}

Ethics.propTypes = {
  classes: PropTypes.object.isRequired,
};

Ethics = withStyles(styles)(Ethics);

export { Ethics };