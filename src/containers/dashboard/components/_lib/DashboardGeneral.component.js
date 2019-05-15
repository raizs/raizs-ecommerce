import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames";
import { connect } from "react-redux";
import { dashboardGeneralWhiteBoxes } from "../../../../assets";
import { Loading } from '../../../../molecules';



const styles = theme => ({
  box:{
    display:"inline-block",
    width:"100%",
    height:"800px",
    padding:5*theme.spacing.unit,
    verticalAlign:"top"
  },
  pageTitle:{
    ...theme.typography.bigTitle,
    textAlign:"left",
    marginBottom:4*theme.spacing.unit
  },
  whiteBox:{
    marginTop:4*theme.spacing.unit,
    backgroundColor: "white",
    width: "100%",
    maxWidth:"1200px",
    borderRadius: theme.spacing.unit,
  },
  whiteBoxTitle:{
     ...theme.typography.formTitle,
    textAlign:"left"
  },
  whiteBoxSection:{
    display:"inline-block",
    verticalAlign:"top",
    padding: 2*theme.spacing.unit,
    width:"calc(100% - 380px)"
  },
  whiteBoxImg:{
    display:"inline-block",
    verticalAlign:"top",
    width:"380px",
    height:"200px",
  },
  whiteBoxValue:{
    fontSize: theme.fontSizes.LG,
    fontWeight:800,
    marginTop:6*theme.spacing.unit,
    textAlign:"left"
  }
});

class DashboardGeneral extends Component{
  constructor(props){
    super(props)

  }

  state={
    loading:true
  }

    componentWillReceiveProps(nextProps){
    if (nextProps.saleOrders){
      this.setState({loading:false})
    }
  }


  _renderWhiteBoxes(){
    const { classes } = this.props;
    return dashboardGeneralWhiteBoxes.map(box=>{
      return(
        <div className={classes.whiteBox}>
          <div className={classes.whiteBoxSection}>
            <h2 className={classes.whiteBoxTitle}>
              {box.subtitle}
            </h2>
            <div className={classes.whiteBoxValue}>
              {this.props.saleOrders[box.id]}
            </div>
          </div>
          <img className={classes.whiteBoxImg} src={box.img}/>
        </div>
      );
    })
  }

  render(){
    const { to, classes, title } = this.props;

    if (this.state.loading){
      return <div className={classes.box}>
        <Loading/>
      </div>
    }

    return (
      <div className={classes.box}>
        <h1 className={classes.pageTitle}>
          Bem vindo, {this.props.user.name}
        </h1>
        {this._renderWhiteBoxes()}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  saleOrders: state.saleOrders.orders
})

DashboardGeneral = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {})
  )(DashboardGeneral);
  export { DashboardGeneral }