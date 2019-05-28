import cep from 'cep-promise';

export class CepHelper {

  static async check(value) {
    const response = { success: false, msg: '', shippingValue: null };
    console.log(value)

    await cep(value)
    .then(res => {
      if(res.city !== 'São Paulo') {
        response.msg = 'Não entregamos na sua região.';
        response.description = 'Infelizmente ainda não atendemos seu endereço. Esperamos que em breve possamos atendê-lo. ';
      }
      else {
      response.msg = "Entregamos no seu cep!"
      response.description = "Agora corra até o catálogo e adicione orgânicos fresquinhos em seu carrinho! "
        response.success = true;
        response.data = res;
        // todo: calculate shipping price
        response.shippingValue = 9.9;
      }
    })
    .catch(() => {
      response.msg = 'CEP inválido.'
      response.description = 'O cep digitado não parece ser válido. Verifique e corrija o cep digitado e tente novamente '
    })

    return response;
  }
  
}