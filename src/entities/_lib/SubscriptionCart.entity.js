import clonedeep from 'lodash.clonedeep';
import { Subscription } from '..';
import moment from "moment";

export class SubscriptionCart {

  /**
   * Creates an instance of SubscriptionCart.
   * 
   * @param {Subscription} subscription
   * @memberof SubscriptionCart
   */
  constructor({items = [], hasEdited = true, selectedDate = null }) {
    this.items = items;
    this.selectedDate = selectedDate;

    this.productQuantities = this._getProductQuantitiesObj(items);
    this.productPartialPrices = this._getProductPartialPricesObj(items);
    this.subtotal = this._getSubtotal(items);
    this.productCount = this._getProductCount(items);
    this.productStocks = this._getProductStocksObj(items);

    this.genericsCount = this._getProductCount(items, 'generics');
    this.complementsCount = this._getProductCount(items, 'complements');
    
    this.getMpFormattedSubscription = this.getMpFormattedSubscription.bind(this);

    this.hasEdited = hasEdited;
  }



  countItems(weekFilter) {

    let { items } = this;
    console.log(items);
    if(!items) return 0;
    let sum = 0;
    for (let item of items) {
      if (weekFilter && weekFilter != item.secondaryPeriodicity) continue;
      sum += parseInt(item.quantity);
    }
    return sum;
  }
  
  update({ product, quantity, periodicity = 'weekly', secondaryPeriodicity, selectedDate }) {
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

    return new SubscriptionCart({ items, selectedDate: selectedDate || this.selectedDate });
  }

  _getProductQuantitiesObj(items) {
    const obj = {};

    items.forEach(item => {
      obj[item.product.id] = item.quantity;
    });

    return obj;
  }

  _getProductStocksObj(items) {
    const obj = {};

    items.forEach(item => {
      obj[item.product.id] = item.product.stock;
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

  getMpFormattedItems(items, transaction) {
    const arr = [];
    items = items || this.items;

    items.forEach(({ product, quantity }) => {
      arr.push({
        description: product.name,
        code: product.id,
        id: product.id,
        quantity,
        pricing_scheme: {
          price: product.mpPrice
        }
      });
    });
    arr.length && arr.push({
      description: "Frete",
      code: "shipping",
      id:"shipping",
      quantity:1,
      pricing_scheme: {
        price: transaction.shipping.value*100
      }
    })

    return arr;
  }

  getFiltersAndDates(momentDate){
    return {
      first:{
        filter: i => i.periodicity === 'weekly' || i.secondaryPeriodicity === 'first',
        date: momentDate.clone()
      },

      second:{
        filter: i => i.periodicity === 'weekly' || i.secondaryPeriodicity === 'second',
        date: momentDate.clone().add(7, 'd')
      },

      third:{
        filter: i => i.periodicity === 'weekly' || (i.periodicity === 'biweekly' && i.secondaryPeriodicity === 'first') || i.secondaryPeriodicity === 'third',
        date: momentDate.clone().add(14, 'd')
      },
      
      fourth:{
        filter: i => i.periodicity === 'weekly' || (i.periodicity === 'biweekly' && i.secondaryPeriodicity === 'second') || i.secondaryPeriodicity === 'fourth',
        date: momentDate.clone().add(21, 'd')
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
      let { date, filter } = filtersAndDates[key];
      let items = this.getMpFormattedItems(this.items.filter(filter), transaction);
      if (items.length) toMp.push({
        ...defaultInfo,
        items,
        // code: "teste",
        discounts: transaction.calculateMpDiscount(key),
        metadata: { 
          startAt: date.format('YYYY-MM-DD'),
          week:key,
          oneCycleSub:false,
          couponValue:transaction.totals.recurrencies[key].coupon,
        }
      })
    })
    toMp = this.cloneFirstCharge(toMp);
    return toMp;

  }

  subtractOneCicle(discounts){
    let newDiscounts = [];
    for (var discount of discounts){
      if (discount.cycles != 1){
        newDiscounts.push({
          ...discount,
          cycles: discount.cycles - 1,
        })
      }
    }
    return newDiscounts;
  }

  cloneFirstCharge(toMp){
    let clone = [...toMp];
    for (var charge of toMp){
      if (charge.metadata.week == "first"){
        clone.push({
          ...charge,
          discounts:this.subtractOneCicle(charge.discounts),
          metadata:{...charge.metadata,
            startAt:moment(charge.metadata.startAt).add(28, 'd').format('YYYY-MM-DD')
          }
        })
        charge.metadata.oneCycleSub = true;
      }
    }
    return clone;
  }



  checkNewDate(oldDate, newDate) {
    const { productQuantities, productStocks } = this;
    const differences = [];
    Object.keys(productQuantities).forEach(id => {
      let stock = productStocks[id]
      let newDateStock = null;
      if (stock){
        newDateStock = stock[newDate]
      }
      let product;

      for(let item of this.items) {
        if(item.product.id === +id) product = item.product;
      }

      if(newDateStock && newDateStock < productQuantities[id]) differences.push({
        id: +id,
        type: newDateStock > 0 ? 'withdraw' : 'remove',
        difference: productQuantities[id] - newDateStock,
        oldQuantity: productQuantities[id],
        newQuantity: newDateStock,
        oldDate,
        newDate,
        product
      })
    });
    return differences;
  }
}
