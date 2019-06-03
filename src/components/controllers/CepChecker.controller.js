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
  
  async handleSubmit() {
    const { setCepAction } = this.getProps();
    const { cep } = this.getState();
    
    if(cep) {
      this.toState({ loading: true });
      const res = await CepHelper.check(Formatter.extractNumbers(cep).toString());
      const { success, msg, description, code } = res;
      console.log('in cep checker response', res);
  
      this.toState({ cep, loading: false, searched: true, success, code, msg, description });
      if(success) setCepAction(res);
    }
  }
}
