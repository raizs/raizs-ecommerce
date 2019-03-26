import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Popper,
  Typography,
  Button,
  Fade,
  Paper,
  withStyles
} from '@material-ui/core';

import styles from './styles/headerPopperButton.styles'

/**
 * HeaderPopperButton - Component with header category button and anchored
 * Popper component
 *
 * @class HeaderPopperButton
 * @extends {Component}
 */
class HeaderPopperButton extends Component {
  state = {
    anchorEl: null,
    open: false,
    timeout: null,
    arrowRef: null
  };

  /**
   * _handleArrowRef - method to place the popper arrow correctly
   *
   * @memberof HeaderPopperButton
   */
  _handleArrowRef = node => {
    this.setState({ arrowRef: node });
  };

  /**
   * _handleMouseEnterButton - handles hover over button
   *
   * @memberof HeaderPopperButton
   */
  _handleMouseEnterButton = event => {
    const { currentTarget } = event;
    this.timeout = null;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: true
    }));
  };
  
  /**
   * _handleMouseEnterPopper - handles hover over popper
   *
   * @memberof HeaderPopperButton
   */
  _handleMouseEnterPopper = () => {
    this.timeout = null;
    this.setState({ open: true });
  }

  /**
   * _handleMouseLeave - handles mouse leave event from popper or button
   *
   * @memberof HeaderPopperButton
   */
  _handleMouseLeave = () => {
    if(this.state.open)
      this.timeout = setTimeout(() => {
        if(this.timeout) this.setState({ open: false })
      }, 50);
  };

  render() {
    const { classes, children, label, clickAction, height } = this.props;
    const { anchorEl, open } = this.state;
    
    let { id } = this.props;
    id = open ? id : null;

    let style = {};
    if(height) style.height = height;

    return (
      <div>
        <Button
          aria-describedby={id}
          onMouseLeave={this._handleMouseLeave}
          onMouseEnter={this._handleMouseEnterButton}
          onMouseOver={this._handleMouseEnterButton}
          className={classes.button}
          onClick={clickAction}
          style={style}
        >
          {label}
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          className={classes.popper}
          modifiers={{
            arrow: {
              enabled: true,
              element: this.state.arrowRef,
            }
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={5}>
                <span className={classes.arrow} ref={this._handleArrowRef} />
                <Typography
                  component='div'
                  onMouseEnter={this._handleMouseEnterPopper}
                  onMouseLeave={this._handleMouseLeave}
                  className={classes.content}
                >
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

HeaderPopperButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

HeaderPopperButton = withStyles(styles)(HeaderPopperButton);

export { HeaderPopperButton };