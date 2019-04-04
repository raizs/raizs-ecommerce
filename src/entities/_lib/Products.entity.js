import { BaseModel } from '../../helpers';
import { Product } from '..';

export class Products extends BaseModel {
  constructor(products) {
    super();
    
    this.original = products;
    this.all = products.map(product => new Product(product));

    this.groupedByCategoryId = this._groupByCategoryId(this.all);
  }

  _groupByCategoryId(all) {
    const obj = {};

    all.forEach(product => {
      if(!obj[product.categoryId]) obj[product.categoryId] = [];

      obj[product.categoryId].push(product);
    })

    return obj;
  }
}