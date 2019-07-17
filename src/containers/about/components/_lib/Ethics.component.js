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
    },
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > img': {
        height: 360,
        width: 360,
        marginTop: 4 * theme.spacing.unit
      }
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
        <img alt='ética e transparencia' src='http://www.pngpix.com/wp-content/uploads/2016/11/PNGPIX-COM-Pie-Chart-PNG-Transparent-Image-500x498.png' />
      </div>
    </div>
  );
}

Ethics.propTypes = {
  classes: PropTypes.object.isRequired,
};

Ethics = withStyles(styles)(Ethics);

export { Ethics };