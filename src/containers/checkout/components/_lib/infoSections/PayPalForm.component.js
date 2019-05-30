import React, { Component } from 'react'
import { withStyles} from '@material-ui/core';
import { TextInput } from '../../../../../molecules';
import { PayPalRepository } from '../../../../../repositories';


const styles = theme => ({
  payPalContainer:{
    padding: theme.spacing.unit
  },
  payPalButton:{
    width:"300px",
    marginLeft:"calc(50% - 150px)" 
  }
});

class PayPalForm extends Component {

  constructor(props){
    super(props);
    this.payPalRepo = new PayPalRepository();
  }

  setPayPalConfigs(){
    const createOrder = (data, actions) => {
        console.log("STARTING")
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        });
    }

    // const { payPalRepo } = this;

    const onApprove = (data, actions) => {
        console.log("APROVED", data, actions)
      return actions.order.capture().then(async function(details) {
        console.log("SUCESSO")
      })
      //   const promise = await this.payPalRepo.createTransaction({orderID: data.orderID})
      //   console.log(promise);

    }
    if (window.paypal && window.paypal.Buttons){
      window.paypal.Buttons({
        createOrder, onApprove, style:{
          layout:"horizontal",
          color:"white", 
          tagline:false
        }
      }).render('#paypal-button-container')
    }
  }

  componentDidMount(){
    console.log("PASSANDO")
    this.setPayPalConfigs();
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

PayPalForm = withStyles(styles)(PayPalForm);

export { PayPalForm };