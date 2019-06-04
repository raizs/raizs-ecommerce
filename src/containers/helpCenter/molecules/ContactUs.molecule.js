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
      position:"relative",
      height:"900px"
    }
  }

};


class ContactUs extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const { classes } = this.props;
    return (
      <div id="contato" className={classnames(classes.wrapper, "offset-important")}>
        CONTATO
      </div>
    )
  }
};


export default ContactUs = withStyles(styles)(ContactUs);