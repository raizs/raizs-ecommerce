import { Formatter } from "../../helpers";

export class Product {
  constructor(product) {
    this.description = product.description || (product['productTmpl.name'] + product['productTmpl.name'] + product['productTmpl.name'])
    this.id = product.id;
    this.name = product['productTmpl.name'];
    this.categoryId = product['productTmpl.categ_id'];
    this.templateId = product['productTmpl.id'];
    this.uomId = product['productTmpl.uom_id'];
    this.brandId = product['productTmpl.product_brand_id'];
    this.brandName = product['productTmpl.productBrand.name'];
    this.price = parseFloat(product['productTmpl.list_price']);
    this.weight = parseFloat(product['productTmpl.weight']);
    this.imageUrl = `https://raizs-stag.odoo.com/product/image?template_id=${this.templateId}`;

    this.fullPrice = this._getFullPrice(this.price, this.weight, this.uomId);
    this.mpPrice = parseInt(this.price * 100);
  }

  _getFullPrice(price, weight, uomId) {
    let weightPart = '';

    if(uomId === 1 && Boolean(weight)) {
      const weightUnit = weight < 1 ? 'g' : 'kg';

      weight = {
        g: weight * 1000,
        kg: weight
      }[weightUnit];

      weightPart = weight.toString() + weightUnit;

      return `${Formatter.currency(price)} / ${weightPart}`;
    }
  }
}