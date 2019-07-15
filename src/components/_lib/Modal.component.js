import React, { Component } from 'react'
import { Icon, withStyles, Modal as MuiModal } from '@material-ui/core';

const styles = theme => ({
  inner: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: '96px',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    margin: 'auto',
    borderRadius: theme.spacing.unit,
    maxHeight: window.innerHeight - 196,
    overflowY: 'auto'
  },
  closeButton: {
    color: theme.palette.green.main,
    position: "absolute",
    top: 2*theme.spacing.unit,
    right: 2*theme.spacing.unit,
    cursor: "pointer"
  }
});

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { closeIcon, classes, open, handleClose, children, width = 800, grayBg } = this.props;
    return (
      <MuiModal
        open={open}
        onClose={handleClose}
        style={{ alignItems: 'center', justifyContent: 'center', transition: "1s" }}
      >
        <div id="modalComponent" className={classes.inner} style={{ width, backgroundColor: grayBg ? '#EFEFEF' : 'white' }}>
          {closeIcon && <Icon onClick={handleClose} className={classes.closeButton}>close</Icon>}
          {children}
        </div>
      </MuiModal>
    )
  }
}

Modal = withStyles(styles)(Modal);

export { Modal };