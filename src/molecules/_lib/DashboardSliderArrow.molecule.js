import React from 'react'
import { withStyles, Icon } from '@material-ui/core';
import classnames from 'classnames';

const styles = theme => ({
  prev: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: -36,
    margin: 'auto',
    height: '80%',
    width: '48px',
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
      height: '48px'
    }
  },
  next: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: -36,
    margin: 'auto',
    height: '80%',
    width: '48px',
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
      height: '48px'
    }
  }
});

let DashboardSliderArrow = props => {
  const { to, classes, onClick, styles } = props;
  const classNames = [classes[to]];

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

DashboardSliderArrow = withStyles(styles)(DashboardSliderArrow);

export { DashboardSliderArrow };