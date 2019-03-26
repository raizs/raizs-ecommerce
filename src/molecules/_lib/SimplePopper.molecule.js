import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Popper,
  Typography,
  Button,
  Fade,
  Paper
} from '@material-ui/core';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
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
  },
});

const _clickEvent = context => {
  if(context.state.open && context.state.shouldClose)
    context.setState({ open: false });
};

class SimplePopper extends Component {
  state = {
    anchorEl: null,
    open: false,
    shouldClose: this.props.shouldClose
  };

  componentDidMount() {
    const context = this;

    document
      .querySelector('body')
      .addEventListener('click', () => _clickEvent(context));
  }

  componentWillUnmount() {
    document.querySelector('body').removeEventListener('click', _clickEvent)
  }

  _handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  render() {
    let { classes, id, children, label } = this.props;
    const { anchorEl, open } = this.state;
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
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
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
  shouldClose: PropTypes.bool,
};

SimplePopper.defaultProps = {
  shouldClose: true
};

SimplePopper = withStyles(styles)(SimplePopper);

export { SimplePopper };