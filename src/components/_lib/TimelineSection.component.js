import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import styles from './styles/timeline.styles';

let TimelineSection = props => {
  const { classes, id, children } = props;

  return (
    <div className={classes.section} id={id}>
      {children}
    </div>
  );
};

TimelineSection.propTypes = {
  classes: PropTypes.object,
};

TimelineSection = withStyles(styles)(TimelineSection);

export { TimelineSection };