import cep from 'cep-promise';

export class CepHelper {

  static async check(value) {
    const response = { success: false, msg: '', shippingValue: null };

    await cep(value)
    .then(res => {
      if(res.city !== 'São Paulo') {
        response.msg = 'Não atendemos sua região =(';
      }
      else {
        response.success = true;
        response.data = res;
        // todo: calculate shipping price
        response.shippingValue = 9.9;
      }
    })
    .catch(() => {
      response.msg = 'CEP inválido.'
    })

    return response;
  }
  
}