import { Formatter } from "../../helpers";

export class Product {
  constructor(product) {
    this.description = product.description || (product['productTmpl.name'] + product['productTmpl.name'] + product['productTmpl.name']);
    this.id = product.id;
    this.name = product['productTmpl.name'];
    this.categoryId = product['productTmpl.categ_id'];
    this.templateId = product['productTmpl.id'];
    this.uomId = product['productTmpl.uom_id'];
    this.brandId = product['productTmpl.product_brand_id'];
    this.brandName = product['productTmpl.productBrand.name'];
    this.price = parseFloat(product['productTmpl.list_price']);
    this.weight = parseFloat(product['productTmpl.weight']);
    this.imageUrl = `https://raizs.odoo.com/product/image?template_id=${this.templateId}`;
    this.moreInfo = "Esse produto ainda não tem 'mais informações'. Mas quem sabe um dia, quando o sol nascer e os passarinhos estiverem cantando eu paro de escrever aqui qualquer coisa como se fosse um Lorem Ipsum"
    this.storageInfo = "Ainda não sabemos aonde armazenar esse produto. Talvez na geladeira ? Mas quem sabe um dia, quando o sol nascer e os passarinhos estiverem cantando eu paro de escrever aqui qualquer coisa como se fosse um Lorem Ipsum"
    this.nutritionalInfo = {
      calories: "93kj",
      carbohydrates: "3mg",
      sodium: "3 toneladas",
      protein: "0"
    }
    this.popularity = product.popularity
    // console.log(product)

    this.fullPrice = this._getFullPrice(this.price, this.weight, this.uomId);
    this.mpPrice = parseInt(this.price * 100);
  }

  _getFullPrice(price, weight, uomId) {
    let weightPart = '';
    let string = Formatter.currency(price);

    if(uomId === 1 && Boolean(weight)) {
      const weightUnit = weight < 1 ? 'g' : 'kg';

      weight = {
        g: weight * 1000,
        kg: weight
      }[weightUnit];

      weightPart = weight.toString() + weightUnit;
      string += ` / ${weightPart}`;
    }


    return string;
  }
}