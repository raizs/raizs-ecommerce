import { BaseController, CepHelper, Formatter } from '../../helpers';
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
    await this.toState(this.baseHandleChange(e, "formatCEP", errors));

  }


  async handleSubmit(){
    this.toState({loading:true});
    const { success, msg, description } = await CepHelper.check(Formatter.extractNumbers(this.getState().cep).toString());

    this.toState({loading:false, searched:true, success, msg, description});

  }
}
