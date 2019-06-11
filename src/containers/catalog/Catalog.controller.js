import { BaseController } from '../../helpers';
import { Products, UnitsOfMeasure, ProductBrands } from '../../entities';
import { ProductsRepository, UnitsOfMeasureRepository } from '../../repositories';
import sortby from 'lodash.sortby';


export class CatalogController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.productsRepo = new ProductsRepository();
    this.uomRepo = new UnitsOfMeasureRepository();

    this.initialFetch = this.initialFetch.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
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
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }

  getAvailableProducts(){
    const { stock, products, date } = this.getProps();
    let { available, unavailable } = stock ? stock.groupAvailabilitiesByDate(products, date) : {
      available:products, unavailable:[]
    }

    // let products = this.getProductsSortedByFilter();
    return { products };
  }


  getProductsSortedByFilter(){
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

  toggleSort(currentFilter){
    const { filter, ascending } = this.getState();
    if (currentFilter == filter){
      this.toState({ascending:!ascending})
    }
    else {
      this.toState({ascending:false, filter:currentFilter})
    }
  }
}