import clonedeep from 'lodash.clonedeep';
import { Subscription } from '..';

export class SubscriptionCart {

  /**
   * Creates an instance of SubscriptionCart.
   * 
   * @param {Subscription} subscription
   * @memberof SubscriptionCart
   */
  constructor(subscription = {}) {
    this.subscription = new Subscription(subscription);
  }
  
  update(product, quantity) {
    product = clonedeep(product);
    const items = clonedeep(this.items);
    let index = -1;

    for(let i in items) {
      const item = items[i];

      if(item.product.id === product.id) {
        index = i;
        break;
      }
    };

    if(index === -1 && quantity) {
      items.push({
        product,
        quantity
      });
    }

    if(index !== -1) {
      if(!quantity) items.splice(index, 1);
      else items[index].quantity = quantity;
    }

    return new SubscriptionCart(items);
  }

  _getProductQuantitiesObj(items) {
    const obj = {};

    items.forEach(item => {
      obj[item.product.id] = item.quantity;
    });

    return obj;
  }

  _getProductPartialPricesObj(items) {
    const obj = {};

    items.forEach(item => {
      obj[item.product.id] = item.quantity * item.product.price;
    });

    return obj;
  }

  _getSubtotal(items) {
    let value = 0;

    items.forEach(item => { value += item.product.price * item.quantity });

    return parseFloat(value.toFixed(2));
  }

  _getProductCount(items) {
    let value = 0;

    items.forEach(item => { value += item.quantity });

    return value;
  }

  getMpFormattedItems() {
    const arr = [];

    this.items.forEach(({ product, quantity }) => {
      arr.push({
        amount: product.mpPrice,
        description: product.name,
        code: product.id,
        quantity
      })
    });

    return arr;
  }
}
