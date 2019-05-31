import clonedeep from 'lodash.clonedeep';
import { Subscription } from '..';

export class SubscriptionCart {

  /**
   * Creates an instance of SubscriptionCart.
   * 
   * @param {Subscription} subscription
   * @memberof SubscriptionCart
   */
  constructor(items = []) {
    this.items = items;

    this.productQuantities = this._getProductQuantitiesObj(items);
    this.productPartialPrices = this._getProductPartialPricesObj(items);
    this.subtotal = this._getSubtotal(items);
    this.productCount = this._getProductCount(items);

    this.genericsCount = this._getProductCount(items, 'generics');
    this.complementsCount = this._getProductCount(items, 'complements');
  }
  
  update(product, quantity, periodicity = 'weekly', secondaryPeriodicity) {
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
        quantity,
        periodicity: 'weekly',
        secondaryPeriodicity: 'first'
      });
    }

    if(index !== -1) {
      if(!quantity) items.splice(index, 1);
      else {
        if(periodicity === 'weekly') secondaryPeriodicity = 'first';
        items[index].quantity = quantity;
        items[index].periodicity = periodicity;
        items[index].secondaryPeriodicity = secondaryPeriodicity || items[index].secondaryPeriodicity;
      }
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

  _getProductCount(items, type) {
    let value = 0;

    if(type) {
      switch(type) {
        case 'generics': items.forEach(item => { if([1,2,3,4].includes(item.product.id)) value += item.quantity }); break;
        case 'complements': items.forEach(item => { if(![1,2,3,4].includes(item.product.id)) value += item.quantity }); break;
      }
    }
    else items.forEach(item => { value += item.quantity });

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
