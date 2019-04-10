import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    color: theme.palette.green.main
  },
});

let Loading = props => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

Loading = withStyles(styles)(Loading);

export { Loading };