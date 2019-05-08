import React from 'react'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  prev: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    height: '264px',
    width: '56px',
    backgroundColor: 'blue'
  },
  next: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    height: '264px',
    width: '56px',
    backgroundColor: 'blue'
  }
});

let SliderArrow = props => {
  const { to, classes } = props;

  return (
    <button type="button" className={classes[to]} aria-label={to}>
      {{ prev: 'back', next: 'go!' }[to]}
    </button>
  )
};

SliderArrow = withStyles(styles)(SliderArrow);

export { SliderArrow };