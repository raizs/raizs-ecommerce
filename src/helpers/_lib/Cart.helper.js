import { Cart, SubscriptionCart } from "../../entities";

export class CartHelper {
  static createCartFromLines({ lines, products }) {
    if(!products || !products.all.length) return null;
    const items = lines.map(line => ({
      product: products.getById(line.productId),
      quantity: parseInt(line.productUomQty)
    }));

    return new Cart({ items });
  }

  static createSubscriptionCartFromLines({ lines, products }) {
    if(!products || !products.all.length) return null;
    const items = lines.map(line => ({
      product: products.getById(line.product_id),
      quantity: parseInt(line.quantity),
      periodicity: line.periodicity,
      secondaryPeriodicity: line.delivery_week
    }));

    return new SubscriptionCart({ items });
  }
}