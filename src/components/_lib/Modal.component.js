import React, { Component } from 'react'
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

class Modal extends Component{

  constructor(props){
    super(props)
  }

  state={
    top:"-300%",
  }

  componentWillReceiveProps(){
    if (this.state.top != "-300%"){
      this.setState({top:"-300%"})
    }
  }

  componentDidUpdate(){
    if (this.state.top == "-300%"){    
      setTimeout( () => {
        let modal = document.querySelector("#modalComponent")
        if (modal){
          console.log("AEWWWWW", modal);
          console.log(modal.offsetHeight)
          let top = Math.floor((window.innerHeight - modal.offsetHeight)/2).toString()+"px"
          this.setState({top})
        }

      }, 50)
    }

  }

  render(){
    const { closeIcon, classes, open, handleClose, children, width = 800 } = this.props;
    return (
      <MuiModal
        open={open}
        onClose={handleClose}
        style={{ alignItems: 'center', justifyContent: 'center', transition: "1s" }}
      >
        
        <div id="modalComponent" className={classes.inner} style={{ width, top: this.state.top }}>
          {closeIcon && <Icon onClick={handleClose} className={classes.closeButton}>close</Icon>}
          {children}
        </div>
      </MuiModal>
    )
  }
}

Modal = withStyles(styles)(Modal);

export { Modal };