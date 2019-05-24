import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  section: {
    padding: 2 * theme.spacing.unit,
    marginTop: 8 * theme.spacing.unit,
    '&:first-child': {
      marginTop: 2 * theme.spacing.unit
    }
  }
});

let TimelineSection = props => {
  const { classes, id, children, style } = props;

  return (
    <div className={classes.section} id={id} style={style || {}}>
      {children}
    </div>
  );
};

TimelineSection.propTypes = {
  classes: PropTypes.object,
};

TimelineSection = withStyles(styles)(TimelineSection);

export { TimelineSection };