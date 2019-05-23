import React from 'react'
import { withStyles, Icon } from '@material-ui/core';
import classnames from 'classnames';

const styles = theme => ({
  prev: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: '8px',
    margin: 'auto',
    height: '264px',
    width: '56px',
    borderRadius: theme.spacing.unit,
    backgroundColor: 'rgba(230, 230, 230, .5)',
    cursor: 'pointer',
    fontSize: theme.fontSizes.LG,
    fontWeight: 600,
    transition: '.35s',
    '&:hover': {
      backgroundColor: 'rgba(230, 230, 230, .9)',
      '& span': {
        color: theme.palette.green.main
      }
    },
    '&.-small': {
      height: '36px'
    }
  },
  next: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: '8px',
    margin: 'auto',
    height: '264px',
    width: '56px',
    borderRadius: theme.spacing.unit,
    backgroundColor: 'rgba(230, 230, 230, .5)',
    cursor: 'pointer',
    fontSize: theme.fontSizes.LG,
    fontWeight: 600,
    transition: '.35s',
    '&:hover': {
      backgroundColor: 'rgba(230, 230, 230, .9)',
      '& span': {
        color: theme.palette.green.main
      }
    },
    '&.-small': {
      height: '36px'
    }
  }
});

let SliderArrow = props => {
  const { to, classes, onClick, styles, isSmall } = props;
  const classNames = [classes[to]];

  if(isSmall) classNames.push('-small');

  return (
    <button
      style={styles || {}}
      type="button"
      onClick={onClick}
      className={classnames(classNames)}
      aria-label={to}
    >
      <Icon fontSize='large'>{{ prev: 'keyboard_arrow_left', next: 'keyboard_arrow_right' }[to]}</Icon>
    </button>
  )
};

SliderArrow = withStyles(styles)(SliderArrow);

export { SliderArrow };