import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  sections: {
    padding: `${2 * theme.spacing.unit}px 0`,
    display: 'inline-block',
  }
});

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

TimelineSections.propTypes = {
  fixed: PropTypes.bool,
  classes: PropTypes.object,
};

TimelineSections.defaultProps = {
  fixed: true
};

TimelineSections = withStyles(styles)(TimelineSections);

export { TimelineSections };