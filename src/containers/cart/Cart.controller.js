import cep from 'cep-promise';

import { BaseController, Formatter } from '../../helpers';

export class CartController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
  }

  async handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();

    const newCart = cart.update(item, quantity);
    updateCartAction(newCart);
  }

  handleChange(e) {
    const { id } = e.target;
    let { value } = e.target;

    const toState = { [id]: value };

    if(id === 'cep') {
      value = Formatter.formatCEP(value);
      toState.cep = value;
      toState.cepError = null;
    }
    
    this.toState(toState);
  }

  handleCepBlur(e) {
    const { value } = e.target;
    if(value.length < 9) {
      if(!value.length) return;
      return this.toState({ cepError: 'CEP inválido.' })
    }

    cep(value)
    .then(response => {
      if(response.city !== 'São Paulo') this.toState({ cepError: "Não atendemos sua região =(" })
      else {
        // todo: calculate shipping price
        this.toState({ shippingValue: 9.9, cepSuccess: true });
      }
    })
    .catch(err => {
      this.toState({ cepError: 'CEP inválido.' })
    })
  }
}