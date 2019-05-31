import { BaseController, Formatter, CepHelper } from "../../helpers";

export class SubscriptionController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateSubscriptionCart = this.handleUpdateSubscriptionCart.bind(this);
    this.handleContinueAction = this.handleContinueAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleUpdateSubscriptionCart({ item, quantity, periodicity, secondaryPeriodicity }) {
    const { subscriptionCart, updateSubscriptionCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity, periodicity, secondaryPeriodicity }, subscriptionCart, updateSubscriptionCartAction);
  }

  handleContinueAction(currentObservations) {
    const { setCurrentObservationsAction, history } = this.getProps()
    setCurrentObservationsAction(currentObservations);
    history.push('/assinatura/complementos');
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

  async handleCepBlur(e) {
    const { value } = e.target;
    if(value.length < 9) {
      if(!value.length) return;
      return this.toState({ cepError: 'CEP inválido.' })
    }

    this.toState({ cepLoading: true });
    const { success, msg, shippingValue } = await CepHelper.check(value);

    if(success) this.toState({ cepLoading: false, shippingValue, cepSuccess: true })
    else this.toState({ cepLoading: false, cepError: msg });
  }

  handleCheckout(subscriptionName) {
    const { history, setSubscriptionNameAction, addSubscriptionCartToCartAction } = this.getProps();
    setSubscriptionNameAction(subscriptionName || 'Minha cesta');
    addSubscriptionCartToCartAction();
    history.push('/carrinho');
  }
}