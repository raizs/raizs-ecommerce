import clonedeep from 'lodash.clonedeep';

export class Cart {

  /**
   * Creates an instance of Cart.
   * 
   * @param {Array} items - Array of { product: {Product}, quantity: {Number}, partialValue: {Number} }
   * @memberof Cart
   */
  constructor(items = []) {
    this.items = items;

    this.productQuantities = this._getProductQuantitiesObj(items);
    this.productPartialPrices = this._getProductPartialPricesObj(items);
    this.subtotal = this._getSubtotal(items);
    this.productCount = this._getProductCount(items);

    this.getMpFormattedItems = this.getMpFormattedItems.bind(this);
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

    return new Cart(items);
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
