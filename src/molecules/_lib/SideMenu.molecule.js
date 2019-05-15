import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames"


const styles = theme => ({
  box:{
    display:"inline-block",
    width:"250px",
    height:"800px",
    // backgroundColor:"red",
    paddingLeft:"100px",
    verticalAlign:"top"
  },
  title:{
    fontSize:theme.fontSizes.SM,
    color: theme.palette.black.main,
    fontWeight:800,
    marginTop:8*theme.spacing.unit,
    marginBottom:2*theme.spacing.unit
  },
  sectionLink:{
    cursor:"pointer",
    marginBottom:theme.spacing.unit,
    "&:hover":{
      color:theme.palette.green.main
    }
  },
  selectedLink:{
    fontWeight:800
  },
});

class SideMenu extends Component{
  constructor(props){
    super(props)

  }

  _renderSectionLinks(){
    const { classes, sections } = this.props;
    return sections.map(section=>{
      const classesArr = [classes.sectionLink]
      if (this.props.location.pathname == section.route)
        classesArr.push(classes.selectedLink) 
      return <div className={classnames(classesArr)} onClick={()=>this.props.history.push(section.route)}>{section.title}</div>
    })
  }

  render(){
    const { to, classes, title } = this.props;
    return (
      <div className={classes.box}>
        <div className={classes.title}>{title}</div>
        {this._renderSectionLinks()}
      </div>
    )
  }
};

SideMenu = compose(
  withStyles(styles),
  withRouter,
  )(SideMenu);

export { SideMenu };