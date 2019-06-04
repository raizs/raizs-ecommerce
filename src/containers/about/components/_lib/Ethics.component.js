import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core';
import { ethicsInfoText } from '../../../../assets';

const styles = theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`,
    '& > h4': theme.typography.timelineSectionTitle,
    '& > h2': {
      ...theme.typography.bigTitle,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > p': {
      ...theme.typography.infoText,
      textAlign: 'center'
    }
  }
});

let Ethics = ({ classes, id }) => {

  return (
    <div id={id} className={classnames(classes.wrapper, 'offset-important')}>
      <h4>ÉTICA E TRANSPARÊNCIA</h4>
      <h2>Sustentável e transparente</h2>
      <p>{ethicsInfoText}</p>
      <div>
        AHO
      </div>
    </div>
  );
}

Ethics.propTypes = {
  classes: PropTypes.object.isRequired,
};

Ethics = withStyles(styles)(Ethics);

export { Ethics };