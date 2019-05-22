import React from 'react'
import { withStyles, Modal as MuiModal } from '@material-ui/core';

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
  }
});

let Modal = props => {
  const { classes, open, handleClose, children, width = 800 } = props;
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={classes.inner} style={{ width }}>
        {children}
      </div>
    </MuiModal>
  )
}

Modal = withStyles(styles)(Modal);

export { Modal };