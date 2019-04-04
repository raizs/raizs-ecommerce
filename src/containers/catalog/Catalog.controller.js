import { BaseController } from '../../helpers';
import { Products, UnitsOfMeasure } from '../../entities';
import { ProductsRepository, UnitsOfMeasureRepository } from '../../repositories';

export class CatalogController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.productsRepo = new ProductsRepository();
    this.uomRepo = new UnitsOfMeasureRepository();

    this.initialFetch = this.initialFetch.bind(this);
  }

  async initialFetch() {
    const { setProductsAction, setUnitsOfMeasureAction } = this.getProps();
    const promises = [
      this.productsRepo.fetchProducts(),
      this.uomRepo.fetchUnitsOfMeasure()
    ];

    const [
      productsPromise,
      uomPromise
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
}