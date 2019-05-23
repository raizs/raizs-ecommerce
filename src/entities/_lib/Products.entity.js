import { BaseModel } from '../../helpers';
import { Product } from '..';
import sortby from 'lodash.sortby';

export class Products extends BaseModel {
  constructor(products, from = null) {
    super();

    if(['popularProducts', 'newProducts'].includes(from)) {
      products = this._fixPopularProducts(products);
    }

    const catalogFilter = p => ![1,2,3,4].includes(p.id);
    const genericFilter = p => [1,2,3,4].includes(p.id);
    const withoutFLVFilter = p => ![5,6,7].includes(p.categoryId);
    const merceariaFilter = p => [11,12,13,14,15,16,17,18,19,20,21,22,23].includes(p.categoryId);
    const ovosFilter = p => [25,26,27,28].includes(p.categoryId);
    const bebidasFilter = p => [30,31,32,33,34,35,36].includes(p.categoryId);
    const corpoFilter = p => [38,39,40,41,42,43].includes(p.categoryId);
    const mapper = p => new Product(p);
    
    this.original = products;
    this.all = products.map(product => new Product(product));
    this.allWithoutFLV = products.map(product => new Product(product)).filter(withoutFLVFilter);
    this.catalogProducts = products.filter(catalogFilter).map(mapper);
    this.genericProducts = sortby(products.filter(genericFilter).map(mapper), 'id');

    this.merceariaProducts = this.all.filter(merceariaFilter);
    this.ovosProducts = this.all.filter(ovosFilter);
    this.bebidasProducts = this.all.filter(bebidasFilter);
    this.corpoProducts = this.all.filter(corpoFilter);    

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

  _fixPopularProducts(products) {
    return products.map(p => ({
      id: p.productProductId,
      'productTmpl.name': p['productProduct.productTmpl.name'],
      'productTmpl.categ_id': p['productProduct.productTmpl.categ_id'],
      'productTmpl.id': p['productProduct.productTmpl.id'],
      'productTmpl.uom_id': p['productProduct.productTmpl.uom_id'],
      'productTmpl.product_brand_id': p['productProduct.productTmpl.product_brand_id'],
      'productTmpl.list_price': p['productProduct.productTmpl.list_price'],
      'productTmpl.weight': p['productProduct.productTmpl.weight']
    }));
  }
}