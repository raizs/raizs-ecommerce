import { BaseController, CepHelper } from '../../helpers';
import { ProductsRepository } from "../../repositories"
import { Product } from '../../entities';


export class CepCheckerController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.productRepo = new ProductsRepository();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    


  async handleChange(e, format) {
    const { errors } = this.getState();
    await this.toState(this.baseHandleChange(e, null, errors));

  }


  async handleSubmit(){
    this.toState({loading:true});
    const { success, msg } = await CepHelper.check(this.getState().cep);

    this.toState({loading:false, searched:true, success, msg});

  }
}
