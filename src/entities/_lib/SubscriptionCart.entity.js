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
    
    this.getMpFormattedSubscription = this.getMpFormattedSubscription.bind(this);
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
        if(periodicity !== items[index].periodicity) secondaryPeriodicity = 'first';
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

  getMpFormattedItems(items) {
    const arr = [];
    items = items || this.items;

    items.forEach(({ product, quantity }) => {
      arr.push({
        description: product.name,
        code: product.id,
        quantity,
        pricing_scheme: {
          price: product.mpPrice
        }
      });
    });

    return arr;
  }

  getFiltersAndDates(momentDate){
    return {
      first:{
        filter: i => i.periodicity === 'weekly' || i.secondaryPeriodicity === 'first',
        date: momentDate.clone().format('YYYY-MM-DD')
      },

      second:{
        filter: i => i.periodicity === 'weekly' || i.secondaryPeriodicity === 'second',
        date: momentDate.clone().add(7, 'd').format('YYYY-MM-DD')
      },

      third:{
        filter: i => i.periodicity === 'weekly' || (i.periodicity === 'biweekly' && i.secondaryPeriodicity === 'first') || i.secondaryPeriodicity === 'third',
        date: momentDate.clone().add(14, 'd').format('YYYY-MM-DD')
      },
      
      fourth:{
        filter: i => i.periodicity === 'weekly' || (i.periodicity === 'biweekly' && i.secondaryPeriodicity === 'second') || i.secondaryPeriodicity === 'fourth',
        date: momentDate.clone().add(21, 'd').format('YYYY-MM-DD')
      },
    }
  }

  getMpFormattedSubscription({ momentDate, customerId, cardId, subtotal, transaction }) {
    const defaultInfo = {
      customer_id: customerId,
      card_id: cardId,
      payment_method: "credit_card",
			currency: "BRL",
			interval: "day",
			interval_count: 28,
			billing_type: "prepaid"
    };



    let filtersAndDates = this.getFiltersAndDates(momentDate);
    let toMp = [];
    ["first", "second", "third", "fourth"].forEach(key=>{
      let items = this.getMpFormattedItems(this.items.filter(filtersAndDates[key].filter));
      if (items.length) toMp.push({
        ...defaultInfo,
        items,
        start_at: filtersAndDates[key].date,
        discounts: transaction.calculateMpDiscount(key)
      })
    })
    return toMp;

  }
}
