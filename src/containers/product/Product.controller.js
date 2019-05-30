import { BaseController } from '../../helpers';
import {ProductsRepository} from "../../repositories"
import { Product } from '../../entities';


export class ProductController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.productRepo = new ProductsRepository();
    this.handleUpdateCart = this.handleUpdateCart.bind(this)
  }


  async fetchProduct({match, product}) {
    if (product) {
      return this.toState({ product });
    }
    const { productId } = match.params
    if (productId) {
      const promise = await this.productRepo.fetchProduct(productId)
      if (!promise.err) {
        product = new Product(promise.data)
        this.toState({product})
      }
    }
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }
  
    
    
}