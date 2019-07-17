import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';

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
    label:{
      fontSize: theme.fontSizes.XS,
      fontWeight:800
    },
    qBox:{
      padding:`${unit}px 0`,
    },
    qBoxQuestion:{
      fontSize: theme.fontSizes.XS,
      fontWeight:800
    },
    qBoxAnswer:{
      fontSize: theme.fontSizes.XS,
    },
  }
};


class FAQTopic extends Component{
  constructor(props) {
    super(props);

    this.state = {
      open:false
    }
  }

  _renderQuestions() {
    const { classes, questions } = this.props;
    return questions.map((q, key)=>{
      return <div key={key} className={classes.qBox}>
        <div className={classes.qBoxQuestion}>{q.question}</div>
        <div className={classes.qBoxAnswer}>{q.answer}</div>
      </div>
    })
  }

  render(){
    const { classes, subject } = this.props;
    const { open } = this.state;
    return (
      <div onClick={()=>this.setState({open:!open})} className={classes.wrapper}>
        <Icon className={classes.arrowIcon}>{open ? "keyboard_arrow_up" : "keyboard_arrow_down"}</Icon>
      	<div className={classes.label}>{subject}</div>
        {open && this._renderQuestions()}
      </div>
    )
  }
};


export default FAQTopic = withStyles(styles)(FAQTopic);