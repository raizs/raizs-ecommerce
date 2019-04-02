import { BaseModel } from '../../helpers';
import { Product } from '..';

export class Products extends BaseModel {
  constructor(products) {
    super();
    
    this.original = products;
    this.all = products.map(product => new Product(product));
  }
}