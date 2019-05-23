import { BaseController } from '../../helpers';
import { ProductsRepository } from "../../repositories"
import { Product } from '../../entities';


export class SearchBarController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.productRepo = new ProductsRepository();
    this.handleChange = this.handleChange.bind(this)
  }    


  handleChange(e, format) {
    const { errors } = this.getState();
    this.toState(this.baseHandleChange(e, null, errors));
  }

}
