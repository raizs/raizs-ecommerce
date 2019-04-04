export class Product {
  constructor(product) {
    this.id = product.id;
    this.name = product['productTmpl.name'];
    this.categoryId = product['productTmpl.categ_id'];
    this.templateId = product['productTmpl.id'];
  }
}