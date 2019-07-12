import { Cart, SubscriptionCart } from "../../entities";

export class CartHelper {
  static createCartFromLines({ lines, products, withStock }) {
    if(!products || !products.all.length) return null;
    const items = lines.map(line => ({
      product: products.getById(line.productId),
      quantity: parseInt(line.productUomQty)
    }));

    return new Cart({ items });
  }

  static createCartFromLinesWithStock({ lines, products, stockDate }) {
    let hasModifications = false;

    if(!products || !products.all.length) return null;
    const items = lines.map(line => {
      const product = products.getById(line.productId);
      const stock = product.stock[stockDate];
      let quantity = parseInt(line.productUomQty);
      if(quantity < stock) {
        quantity = stock;
        hasModifications = true;
      }

      if(quantity) return { product, quantity };
    }).filter(item => item);

    const cart = items.length ? new Cart({ items }) : null;

    return { cart, hasModifications };
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

  static createCartFromCookie({ cookieCart, products, stockDate }) {
    if(!products || !products.all.length) return null;

    const items = cookieCart.items.map(item => ({
      product: products.getById(item.product),
      quantity: parseInt(item.quantity),
    }));
    const { id } = cookieCart;

    return new Cart({ items, id, selectedDate: stockDate });
  }
}