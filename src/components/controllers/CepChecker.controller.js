import { BaseController, CepHelper, Formatter } from '../../helpers';
import { ProductsRepository } from "../../repositories"

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
      let promise = await CepHelper.checkShippingByCep(Formatter.extractNumbers(cep).toString());
      if (promise.error){
        setCepAction(null)
        return this.toState({ cep:"", loading: false, searched: true, success:false, msg:promise.error.msg });
      }
      console.log(promise);
      this.toState({ loading: false, searched: true, success:true,  msg:"" });
      setCepAction(cep , promise.data.availability);

    }
  }
}
