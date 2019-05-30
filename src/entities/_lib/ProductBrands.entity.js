import { BaseModel } from '../../helpers';
import { ProductBrand } from '..';

export class ProductBrands extends BaseModel {
  constructor(productBrands = []) {
    super();
    
    this.original = productBrands;
    this.all = productBrands.map(brand => new ProductBrand(brand));

    this.getNameFromId = this.getNameFromId.bind(this);
  }

  getNameFromId(brandId) {
    let name = 'Raizs';

    for(let brand of this.all) {
      if(brand.id === brandId) name = brand.name;
    }

    return name;
  }
}