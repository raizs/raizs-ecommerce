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
    const mapper = p => new Product(p);
    
    this.original = products;
    this.all = products.map(product => new Product(product));
    this.catalogProducts = products.filter(catalogFilter).map(mapper);
    this.genericProducts = sortby(products.filter(genericFilter).map(mapper), 'id');

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


  _search(query){
    let results = [];
    for (var product of this.all){
      if (
        (product.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (product.description.toLowerCase().indexOf(query.toLowerCase()) > -1) 
        )
        results.push(product)
    }
    return results
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