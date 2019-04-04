import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import styles from './styles/timeline.styles';

let TimelineSections = props => {
  const { classes, width, timelineWidth, fixed, children } = props;

  const style = { width };
  if(fixed) {
    style.marginLeft = timelineWidth;
  };

  return (
    <div id='timeline-sections' className={classes.sections} style={style}>
      {children}
    </div>
  );
};

TimelineSections.defaultProps = {
  fixed: true
};

TimelineSections = withStyles(styles)(TimelineSections);

export { TimelineSections };