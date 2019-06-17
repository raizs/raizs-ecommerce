import React, { Component } from 'react'
import { withStyles} from '@material-ui/core';
import { TextInput } from '../../../../../molecules';
import { PayPalRepository } from '../../../../../repositories';
import { BaseContainer } from '../../../../../helpers';
import { withRouter } from 'react-router';
import { PayPalController } from "../../../PayPal.controller.js"
import compose from 'recompose/compose';
import { connect } from 'react-redux';


const styles = theme => ({
  payPalContainer:{
    padding: theme.spacing.unit
  },
  payPalButton:{
    width:"300px",
    marginLeft:"calc(50% - 150px)" 
  }
});

class PayPalForm extends BaseContainer {

  constructor(props){
    super(props, PayPalController);
    this.payPalRepo = new PayPalRepository();
  }

  componentDidMount(){
    console.log("PASSANDO")
    this.controller.setCheckoutButton()
  }

  state = {
    showButton:false
  }

  render() {
    const {
      classes,
    } = this.props;


    return (
      <form className={classes.payPalContainer}>
        <div className={classes.payPalButton} id="paypal-button-container"></div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart,
  momentDate: state.datePicker.momentDate,
  coupon: state.coupon.selected,
  giftCard: state.giftCard,
});

PayPalForm = compose(
  withStyles(styles),
  connect(mapStateToProps, {})
  )(PayPalForm);

export { PayPalForm };