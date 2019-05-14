import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames"


const styles = theme => ({
  box:{
    display:"inline-block",
    width:"300px",
    height:"800px",
    // backgroundColor:"red",
    paddingLeft:"100px",
    verticalAlign:"top"
  },
});

class DashboardGeneral extends Component{
  constructor(props){
    super(props)

  }

  render(){
    const { to, classes, title } = this.props;
    return (
      <div className={classes.box}>
        GENERAL
      </div>
    )
  }
};

DashboardGeneral = compose(
  withStyles(styles),
  withRouter,
  )(DashboardGeneral);
  export { DashboardGeneral }