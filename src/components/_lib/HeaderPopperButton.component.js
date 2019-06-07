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
import classnames from 'classnames';

const styles = theme => ({
  content: {
    padding: `${theme.spacing.unit * 2}px`,
  },

  cestaContent: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: theme.spacing.unit
  },

  button: {
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
    },
    '&.-cesta': {
      padding: 0
    }
  },

  popper: {
    zIndex: 10,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.lightGray.main} transparent`,
      },
    }
  },

  cestaPopper: {
    zIndex: 10,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: -11,
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1.5em 1.5em 1.5em',
        borderColor: `transparent transparent ${theme.palette.green.light} transparent`,
      },
    }
  },

  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

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
    this.setState({
      anchorEl: currentTarget,
      open: true
    });
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
    const { classes, children, label, clickAction, height, placement, cesta, timeout } = this.props;
    const { anchorEl, open } = this.state;
    let { id } = this.props;
    
    const buttonClassName = [classes.button];
    if(id === 'cesta') buttonClassName.push('-cesta');

    id = open ? id : null;
    
    let style = {};
    if(height) style.height = height;

    const contentClassName = cesta ? classes.cestaContent : classes.content;

    return (
      <div>
        <Button
          aria-describedby={id}
          onMouseLeave={this._handleMouseLeave}
          onMouseEnter={this._handleMouseEnterButton}
          onMouseOver={this._handleMouseEnterButton}
          className={classnames(buttonClassName)}
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
          className={cesta ? classes.cestaPopper : classes.popper}
          placement={placement || 'bottom'}
          modifiers={{
            arrow: {
              enabled: true,
              element: this.state.arrowRef,
            }
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={timeout || { enter: 350, exit: 100 }}>
              <Paper elevation={5}>
                <span className={classes.arrow} ref={this._handleArrowRef} />
                <Typography
                  component='div'
                  onMouseEnter={this._handleMouseEnterPopper}
                  onMouseLeave={this._handleMouseLeave}
                  className={contentClassName}
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