import { BaseController } from '../../helpers';
import { Products, UnitsOfMeasure, ProductBrands } from '../../entities';
import { ProductsRepository, UnitsOfMeasureRepository, ProductBrandsRepository } from '../../repositories';

export class CatalogController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.productsRepo = new ProductsRepository();
    this.uomRepo = new UnitsOfMeasureRepository();
    this.brandsRepo = new ProductBrandsRepository();

    this.initialFetch = this.initialFetch.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
  }

  async initialFetch() {
    const {
      setProductsAction,
      setUnitsOfMeasureAction,
      setProductBrandsAction
    } = this.getProps();

    const promises = [
      this.productsRepo.fetchProducts(),
      this.uomRepo.fetchUnitsOfMeasure(),
      this.brandsRepo.fetchProductBrands()
    ];

    const [
      productsPromise,
      uomPromise,
      brandsPromise
    ] = await Promise.all(promises);

    if(!productsPromise.err) {
      const products = new Products(productsPromise.data);

      setProductsAction(products);
    }
    
    if(!uomPromise.err) {
      const uom = new UnitsOfMeasure(uomPromise.data);

      setUnitsOfMeasureAction(uom);
    }
    
    if(!brandsPromise.err) {
      const brands = new ProductBrands(brandsPromise.data);

      setProductBrandsAction(brands);
    }
  }

  async handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();

    const newCart = cart.update(item, quantity);
    updateCartAction(newCart);
  }
}