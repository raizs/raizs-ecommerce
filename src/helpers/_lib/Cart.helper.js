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
      return null;
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

  static createSubCartFromCookie({ cookieSubCart, products, stockDate, id }) {
    if(!products || !products.all.length) return null;

    const items = cookieSubCart.items.map(item => ({
      product: products.getById(item.product),
      quantity: parseInt(item.quantity),
      periodicity: item.periodicity,
      secondaryPeriodicity: item.delivery_week
    }));
    const { hasEdited } = cookieSubCart;

    return new SubscriptionCart({ items, id, selectedDate: stockDate, hasEdited });
  }

  static createDefaultSubCart({ products, stockDate, id }) {
    if(!products || !products.all.length) return null;

    const defaultProducts = [
      {
        id: 1,
        quantity: 3,
        periodicity: 'weekly',
        secondaryPeriodicity: 'first'
      }, {
        id: 2,
        quantity: 3,
        periodicity: 'weekly',
        secondaryPeriodicity: 'first'
      }, {
        id: 3,
        quantity: 4,
        periodicity: 'weekly',
        secondaryPeriodicity: 'first'
      }, {
        id: 4,
        quantity: 2,
        periodicity: 'weekly',
        secondaryPeriodicity: 'first'
      }
    ];

    const items = defaultProducts.map(item => ({
      product: products.getById(item.id),
      quantity: item.quantity,
      periodicity: item.periodicity,
      secondaryPeriodicity: item.secondaryPeriodicity
    }));
    
    return new SubscriptionCart({ items, id, selectedDate: stockDate, hasEdited: true });
  }
}