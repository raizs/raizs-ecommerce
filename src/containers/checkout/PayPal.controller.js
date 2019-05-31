import { BaseController, CepHelper, Formatter } from '../../helpers';
import { ProductsRepository } from "../../repositories"
import { Product, Transaction } from '../../entities';


export class PayPalController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.productRepo = new ProductsRepository();
    this.setCheckoutButton = this.setCheckoutButton.bind(this);
  }

  setCheckoutButton(){
    console.log("working")
    const { cart, subscriptionCart } = this.getProps();
    const transaction = new Transaction(cart, subscriptionCart, null, null, null);
    console.log(transaction)
    return
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

    const onApprove = (data, actions) => {
      console.log("APROVED", data, actions)
      return actions.order.capture().then(async function(details) {
          console.log("SUCESSO")
      })

    }
    if (window.paypal && window.paypal.Buttons){
      window.paypal.Buttons({
        createOrder,
        onApprove,
        style:{
          layout:"horizontal",
          color:"white", 
          tagline:false
        }
      }).render('#paypal-button-container')
    }

  }   


}
