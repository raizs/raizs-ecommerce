import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core';
import { ethicsInfoText } from '../../../../assets';

const styles = theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  title: {
    ...theme.typography.timelineSectionTitle,
  },
  bigTitle: {
    ...theme.typography.bigTitle,
    marginBottom: 2 * theme.spacing.unit
  },
  content: {
    margin: `${6 * theme.spacing.unit}px 0`,
  },
  info: {
    ...theme.typography.infoText,
    textAlign: 'center'
  }
});

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