import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.inline': {
      display: 'inline-block',
      width: 'auto',
      verticalAlign: 'middle'
    },
    '&.absolute': {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'rgba(255,255,255,.7)',
    },
    '&.fixed': {
      position: 'fixed',
      zIndex: 100,
      backgroundColor: 'rgba(255,255,255,.7)',
    },
    '&.noBg': {
      backgroundColor: 'transparent'
    }
  },
  progress: {
    '& *': {
      color: theme.palette.green.main
    }
  },
});

let Loading = props => {
  const { classes, size } = props;
  const wrapperClasses = [classes.wrapper, 'loading'];
  if(props.inline) wrapperClasses.push('inline');
  if(props.absolute) wrapperClasses.push('absolute');
  if(props.fixed) wrapperClasses.push('fixed');
  if(props.noBg) wrapperClasses.push('noBg')

  return (
    <div className={classnames(...wrapperClasses)} >
      <CircularProgress className={classes.progress} size={size} />
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

Loading.defaultProps = {
  size: 40
};

Loading = withStyles(styles)(Loading);

export { Loading };