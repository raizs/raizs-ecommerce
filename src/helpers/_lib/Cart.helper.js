import { Cart } from "../../entities";

export class CartHelper {
  static createCartFromLines({ lines, products }) {
    if(!products || !products.all.length) return null;
    const items = lines.map(line => ({
      product: products.getById(line.productId),
      quantity: parseInt(line.productUomQty)
    }));

    return new Cart({ items });
  }
}