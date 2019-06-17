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
    const { cart, coupon, subscriptionCart, giftCard, history, momentDate, createSaleOrder } = this.getProps();

    const transaction = new Transaction({cart, subcart:subscriptionCart, coupon, giftCard, selectedPaymentMethod:"payPal", momentDate});
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code:'BRL',
            value: transaction.totals.immediate.total
          }
        }]
      });
    }

    const onApprove = (data, actions) => {
      console.log("APROVED", data, actions)
      return actions.order.capture().then(async function(details) {
          createSaleOrder(transaction, details);
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
