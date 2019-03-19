import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  content: {
    padding: `${theme.spacing.unit * 2}px`
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
  popper: {
    zIndex: 1,
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

class HeaderPopperButton extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    timeout: null,
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  handleMouseEnterLabel = event => {
    const { currentTarget } = event;
    this.timeout = null;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: true,
    }));
  };

  handleMouseLeave = () => {
    if(this.state.open)
      this.timeout = setTimeout(() => {
        if(this.timeout) this.setState({ open: false })
      }, 50);
  };

  handleMouseEnterPopper = () => {
    this.timeout = null;
    this.setState({ open: true });
  }

  render() {
    const { classes, children, label, clickAction } = this.props;
    const { anchorEl, open } = this.state;
    
    let { id } = this.props;
    id = open ? id : null;

    return (
      <div>
        <Button
          aria-describedby={id}
          onMouseLeave={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnterLabel}
          onMouseOver={this.handleMouseEnterLabel}
          className={classes.button}
          onClick={clickAction}
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
                <span className={classes.arrow} ref={this.handleArrowRef} />
                <Typography
                  component='div'
                  onMouseEnter={this.handleMouseEnterPopper}
                  onMouseLeave={this.handleMouseLeave}
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