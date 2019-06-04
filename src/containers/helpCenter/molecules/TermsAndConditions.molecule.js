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
      maxWidth:"500px",
      padding: "12px",
      margin:`${unit}px 0`,
      cursor:"pointer",
      position:"relative"
    },
    arrowIcon:{
      position:"absolute",
      top:"6px",
      right:unit
    },
    textBox:{
      fontSize: theme.fontSizes.XS,
      lineHeight: theme.fontSizes.SM,
      marginTop:unit,
      fontWeight:300,
      width:"300px",
      color:theme.palette.gray.main
    }
  }

};


class TermsAndConditions extends Component{

  constructor(props){
    super(props)
  }

  state={
    open:false
  }

  _renderText(){
    const { classes, text } = this.props;
    return <div className={classes.textBox}>
      {text}
    </div>
  }

  render(){
    const { classes, subject } = this.props;
    const { open } = this.state;
    return (
      <div onClick={()=>this.setState({open:!open})} className={classes.wrapper}>
        <Icon className={classes.arrowIcon}>{open ? "keyboard_arrow_up" : "keyboard_arrow_down"}</Icon>
      	<div className={classes.label}>{subject}</div>
        {open && this._renderText()}
      </div>
    )
  }
};


export default TermsAndConditions = withStyles(styles)(TermsAndConditions);