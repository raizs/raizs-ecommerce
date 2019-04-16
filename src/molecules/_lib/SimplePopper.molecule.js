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

import styles from './styles/simplePopper.styles';
import {
  openUserPopperAction,
  closeUserPopperAction,
  toggleUserPopperAction
} from '../../store/actions';

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
    let { classes, id, children, label, fadeTimeout } = this.props;
    const { anchorEl, connected } = this.state;

    const open = connected ? this.props.open : this.state.open;
    id = open ? id : null;

    return (
      <div>
        <Button
          className={classes.button}
          aria-describedby={id}
          onClick={this._handleClick}
          disableRipple
        >
          {label}
        </Button>
        <Popper
          onClick={this._handlePopperClick}
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={fadeTimeout || 350}>
              <Paper>
                <Typography component='div' className={classes.typography}>
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
