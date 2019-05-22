import React from 'react'
import { Icon, withStyles, Modal as MuiModal } from '@material-ui/core';

const styles = theme => ({
  inner: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    margin: 'auto',
    top: '15%',
    borderRadius: theme.spacing.unit
  },
  closeButton:{
    color:theme.palette.green.main,
    position:"absolute",
    top:2*theme.spacing.unit,
    right:2*theme.spacing.unit,
    cursor:"pointer"
  }
});

let Modal = props => {
  const { closeIcon, classes, open, handleClose, children, width = 800 } = props;
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      style={{ alignItems: 'center', justifyContent: 'center', transition: "1s" }}
    >
      <div className={classes.inner} style={{ width }}>
        {closeIcon && <Icon onClick={handleClose} className={classes.closeButton}>close</Icon>}
        {children}
      </div>
    </MuiModal>
  )
}

Modal = withStyles(styles)(Modal);

export { Modal };