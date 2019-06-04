import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import classnames from "classnames";
import { withRouter } from 'react-router';
import smoothScroll from "smooth-scroll"


const styles = theme => {
  const { unit } = theme.spacing;
  return {
    wrapper:{
      backgroundColor: "white",
      borderRadius: unit,
      width:"100%",
      maxWidth:"800px",
      padding: "12px",
      margin:`${unit}px 0`,
      cursor:"pointer",
      position:"relative"
    }
  }

};


class ContactUs extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const { classes, subject } = this.props;
    const { open } = this.state;
    return (
      <div  className={classes.wrapper}>
          CONTATO
      </div>
    )
  }
};


export default ContactUs = withStyles(styles)(ContactUs);