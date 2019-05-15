import React, { Component } from 'react';
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter, Route, Switch } from 'react-router';
import classnames from "classnames";
import { connect } from "react-redux";
import { } from "../../../../assets";
import { Loading } from '../../../../molecules';
import { DashboardGeneralForm } from "../"
// import { DashboardFormsController } from '../DashboardForms.controller';



const styles = theme => ({
  box:{
    width:"100%",
    padding:5*theme.spacing.unit,
    position:"relative"
  },
  pageTitle:{
    ...theme.typography.bigTitle,
    // textAlign:"left",
    marginBottom:6*theme.spacing.unit
  },
  backButton:{
    position:"absolute",
    left:5*theme.spacing.unit,
    top:5*theme.spacing.unit,
    cursor:"pointer"
  },
  backButtonArrow:{
    verticalAlign:"middle", 
    display:"inline-block",
    fontSize:20
  },
  backButtonText:{
    fontSize:theme.fontSizes.MD,
    verticalAlign:"middle", 
    display:"inline-block",
    fontWeight:800
  }
});

class DashboardForms extends Component{

  constructor(props){
    super(props)

  }

  render(){
    const { to, classes } = this.props;
    const { form } = this.props.match.params

    let title = ""
    let FormComponent = null;
    switch(form){
      case "dados-pessoais": title = "Dados Pessoais"; FormComponent = DashboardGeneralForm; break;
      default: title = "Dados Pessoais"; FormComponent = DashboardGeneralForm; break;

    }


    return (
      <div className={classes.box}>
        <div className={classes.backButton} onClick={()=>this.props.history.goBack()}>
          <Icon className={classes.backButtonArrow}>arrow_back_ios</Icon>
          <div className={classes.backButtonText}>Voltar</div>
        </div>
        <h1 className={classes.pageTitle}>{title}</h1>
        <FormComponent/>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  userAddresses: state.userAddresses.model,
})

DashboardForms = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {})
  )(DashboardForms);
export { DashboardForms }