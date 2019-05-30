import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {
  withStyles,
  Popper,
  Typography,
  Button,
  Fade,
  Paper
} from '@material-ui/core';
import classnames from 'classnames';

import {
  openUserPopperAction,
  closeUserPopperAction,
  toggleUserPopperAction
} from '../../store/actions';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
    '&.-miniDatePicker': {
      marginTop: theme.spacing.unit / 2,
      width: '225px'
    },
    '&.-headerUserButton': {
      width: '272px'
    }
  },
  miniDatePicker: {
    backgroundColor: 'white',
    padding: `0 ${theme.spacing.unit * 2}px`,
    fontSize: theme.fontSizes.XS,
    fontWeight: 700,
    height: '24px',
    '& span': {
      color: theme.palette.black.main
    },
    '&:hover': {
      backgroundColor: 'white',
      '& span': {
        color: theme.palette.green.main
      }
    }
  },
  headerUserButton: {
    backgroundColor: 'transparent',
    padding: `0 ${theme.spacing.unit * 2}px`,
    fontSize: theme.fontSizes.XS,
    fontWeight: 700,
    height: theme.sizes.HEADER_HEIGHT,
    '& span': {
      color: theme.palette.gray.main
    },
    '&:hover': {
      backgroundColor: 'transparent',
      '& span': {
        color: theme.palette.green.main
      }
    }
  },
});

class SimplePopper extends Component {
  state = {
    anchorEl: null,
    open: false,
    connected: this.props.open !== null
  };
  
  componentDidMount() {
    const context = this;
    
    window.addEventListener('keydown', e => this._keydownEvent(e, context));
    
    document
    .querySelector('body')
    .addEventListener('click', () => { if(context.state.open || context.props.open) this._bodyClickEvent(context); });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._keydownEvent);
    document.querySelector('body').removeEventListener('click', this._bodyClickEvent);
  }
  
  _keydownEvent = (e, context) => {
    if(e.key === 'Escape') {
      if(context.state.open) context.setState({ open: false });
      if(context.state.connected) context.props.closeUserPopperAction();
    }
  }
  
  _bodyClickEvent = context => {
    if(context.state.connected) return context.props.closeUserPopperAction();
    context.setState({ open: false });
  };
  
  _handleClick = event => {
    const { currentTarget } = event;
    
    if(this.state.connected) {
      if(!this.state.anchorEl) this.setState({ anchorEl: currentTarget })
      return this.props.toggleUserPopperAction();
    }
    
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  }
  
  _handlePopperClick = () => {
    if(this.state.connected && !this.props.shouldCloseOnInsideClick)
      this.props.openUserPopperAction();
  }

  render() {
    let { classes, id, children, label, fadeTimeout, from } = this.props;
    const { anchorEl, connected } = this.state;

    const open = connected ? this.props.open : this.state.open;
    id = open ? id : null;

    const typographyClasses = [classes.typography];
    if(from === 'miniDatePicker') typographyClasses.push('-miniDatePicker');
    if(from === 'headerUserButton') typographyClasses.push('-headerUserButton');

    return (
      <div>
        <Button
          className={classes[from]}
          aria-describedby={id}
          onClick={this._handleClick}
          disableRipple
        >
          {label}
        </Button>
        <Popper
          onClick={this._handlePopperClick}
          id={id}
          placement='bottom-end'
          open={open}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={fadeTimeout || 350}>
              <Paper>
                <Typography component='div' className={classnames(typographyClasses)}>
                  {children}
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  shouldCloseOnInsideClick: PropTypes.bool,
  fadeTimeout: PropTypes.object,
};

SimplePopper.defaultProps = {
  open: null,
  shouldCloseOnInsideClick: false,
  fadeTimeout: null
};

SimplePopper = compose(
  withStyles(styles),
  connect(null, {
    openUserPopperAction,
    closeUserPopperAction,
    toggleUserPopperAction
  })
)(SimplePopper);

export { SimplePopper };
