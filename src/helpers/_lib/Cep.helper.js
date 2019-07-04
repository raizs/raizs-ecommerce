import Axios from 'axios';
import { ShippingRepository } from "../../repositories"
import { Formatter } from "../../helpers";

export class CepHelper {

  static async check(value) {
    const response = { value, success: false, msg: '', shippingValue: null };

    await Axios.get(`https://viacep.com.br/ws/${value}/json`)
    .then(res => {
      response.success = res.status === 200;
      if(res.data.localidade !== 'São Paulo') {
        response.code = 'unreachable';
        response.msg = 'Não entregamos na sua região.';
        response.description = 'Infelizmente ainda não atendemos seu endereço. Esperamos que em breve possamos atendê-lo. ';
      }
      else {
        response.code = 'success';
        response.msg = "Entregamos no seu cep!"
        response.description = "Agora corra até o catálogo e adicione orgânicos fresquinhos em seu carrinho!";
        response.data = res.data;
        // todo: calculate shipping price
        response.shippingValue = 9.9;
      }
    })
    .catch(() => {
      response.code = 'invalid';
      response.msg = 'CEP inválido.'
      response.description = 'O cep digitado não parece ser válido. Verifique e corrija o cep digitado e tente novamente '
    })

    return this.checkShippingValue(response, value);
  }

  static async checkShippingValue(response, cep){
    if (response.code === "success"){
      let shippingRepo = new ShippingRepository();
      let shippingData = await shippingRepo.getShippingData(Formatter.extractNumbers(cep));
    }
    return response
  }
  
}