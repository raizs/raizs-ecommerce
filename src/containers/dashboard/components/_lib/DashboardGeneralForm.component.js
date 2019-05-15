import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames";
import { connect } from "react-redux";
import { dashboardGeneralWhiteBoxes } from "../../../../assets";
import { Loading, TextInput } from '../../../../molecules';



const styles = theme => ({
  form:{
    width:"100%",
    maxWidth:"800px",
    padding:5*theme.spacing.unit,
    verticalAlign: "top",
    backgroundColor: "white",
    borderRadius: theme.spacing.unit,
  },
  inputBox:{
    width:"33%"
  },
  inputLabel:{
    fontSize: theme.fontSizes.XS,
    fontWeight:800,
    color: theme.palette.black.main,
    marginBottom: theme.spacing.unit
  },
  inputValue:{
    ...theme.inputs.text,
    "&>input":{
      fontSize: theme.fontSizes.XS,
      height: "40px"

    }
  }

});

class DashboardGeneralForm extends Component{
  constructor(props){
    super(props)

  }

  state={
    loading:true,
    user:{

    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user){
      this.setState({loading:false, user: nextProps.user})
    }
  }
  componentWillMount(){
    if (this.props.user){
      this.setState({loading:false, user: this.props.user})
    }
  }

  render(){
    const { to, classes, title } = this.props;

    if (this.state.loading){
      return <div className={classes.form}>
        <Loading/>
      </div>
    }

    const { name } = this.state.user;

    return (
      <form className={classes.form}>

        <div className={classes.inputBox}>
          <TextInput 
            className={classes.inputValue}
            id='name'
            value={name}
            handleChange={()=>console.log("changing")}
            label="Label"
            labelClassName={classes.inputLabel}
          />
        </div>

      </form>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  saleOrders: state.saleOrders.orders
})

DashboardGeneralForm = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {})
  )(DashboardGeneralForm);
  export { DashboardGeneralForm }