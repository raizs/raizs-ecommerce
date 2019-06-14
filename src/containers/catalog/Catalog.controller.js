import { BaseController, MiniDatePickerHelper } from '../../helpers';
import { Products, UnitsOfMeasure, ProductBrands, Cart, SubscriptionCart } from '../../entities';
import { ProductsRepository, UnitsOfMeasureRepository } from '../../repositories';
import sortby from 'lodash.sortby';


export class CatalogController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.productsRepo = new ProductsRepository();
    this.uomRepo = new UnitsOfMeasureRepository();

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.getProductsSortedByFilter = this.getProductsSortedByFilter.bind(this);
    this.getAvailableProducts = this.getAvailableProducts.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  async initialFetch() {
    const {
      setProductsAction,
      setUnitsOfMeasureAction,
    } = this.getProps();

    const promises = [
      this.productsRepo.fetchProducts(),
      this.uomRepo.fetchUnitsOfMeasure(),
    ];

    const [
      productsPromise,
      uomPromise,
    ] = await Promise.all(promises);

    if(!productsPromise.err) {
      const products = new Products(productsPromise.data);

      setProductsAction(products);
    }
    
    if(!uomPromise.err) {
      const uom = new UnitsOfMeasure(uomPromise.data);

      setUnitsOfMeasureAction(uom);
    }
    
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction, stockDate } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction, stockDate);
  }

  handleSelectDate(selected) {
    const { selectDateAction, selectedDate, cart, subscriptionCart, openCartWarningModalAction } = this.getProps();
    const dates = MiniDatePickerHelper.generateDatesObject();

    const oldDate = dates[selectedDate];
    const oldStockDate = oldDate.stockDate;
    const newDate = dates[selected];
    const newStockDate = newDate.stockDate;
    
    const cartInfo = cart.checkNewDate(oldStockDate, newStockDate);
    const subscriptionCartInfo = subscriptionCart.checkNewDate(oldStockDate, newStockDate);
    
    if(cartInfo.length || subscriptionCartInfo.length) {
      let newCart, newSubscriptionCart;
      if(cartInfo.length) {
        newCart = new Cart({ items: cart.items, selectedDate: newDate });
        cartInfo.forEach(diff =>
          newCart = newCart.update({ product: diff.product, quantity: diff.newQuantity })
        );
      }

      if(subscriptionCartInfo.length) {
        newSubscriptionCart = new SubscriptionCart({ items: cart.items, selectedDate: newDate });
        subscriptionCartInfo.forEach(diff =>
          newSubscriptionCart = newSubscriptionCart.update({ product: diff.product, quantity: diff.newQuantity })
        );
      }
      
      return openCartWarningModalAction({ cartInfo, newCart, subscriptionCartInfo, newSubscriptionCart, oldDate, newDate });
    }

    selectDateAction(selected);
  }

  getAvailableProducts() {
    const { stock, products, date } = this.getProps();
    let { available, unavailable } = stock ? stock.groupAvailabilitiesByDate(products, date) : {
      available:products, unavailable:[]
    }

    // let products = this.getProductsSortedByFilter();
    return { products };
  }


  getProductsSortedByFilter() {
    const { filter, ascending } = this.getState();
    const { products } = this.getProps();

    let sorted;

    if (filter=="price") {
      sorted = sortby(products.original, product => {
        const price = parseFloat(product['productTmpl.list_price'])
        return price
      });
    }

    else sorted = sortby(products.original, "popularity")

    if (!ascending) sorted.reverse();
    const newProducts = new Products(sorted)
    return newProducts;
  }

  toggleSort(currentFilter) {
    const { filter, ascending } = this.getState();
    if (currentFilter == filter) {
      this.toState({ ascending:!ascending })
    }
    else {
      this.toState({ ascending:false, filter:currentFilter })
    }
  }
}