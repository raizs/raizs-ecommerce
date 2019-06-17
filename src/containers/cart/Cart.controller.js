import { BaseController, Formatter, CepHelper } from '../../helpers';
import { Cart, SubscriptionCart } from '../../entities';

export class CartController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleUpdateSubscriptionCart = this.handleUpdateSubscriptionCart.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.handleRemoveSubscription = this.handleRemoveSubscription.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }

  handleUpdateSubscriptionCart({ item, quantity, periodicity, secondaryPeriodicity }) {
    const { subscriptionCart, updateSubscriptionCartAction } = this.getProps();
    this.baseHandleUpdateCart({
      item,
      quantity,
      periodicity,
      secondaryPeriodicity
    }, subscriptionCart.current, updateSubscriptionCartAction);
  }

  handleSelectDate(selected) {
    const {
      selectDateAction,
      selectedDate,
      cart,
      openCartWarningModalAction
    } = this.getProps();

    const subscriptionCart = this.getProps().subscriptionCart.current;

    this.baseHandleSelectDate({
      selectDateAction,
      selectedDate,
      cart,
      subscriptionCart,
      openCartWarningModalAction,
      selected,
      Cart,
      SubscriptionCart
    });
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

    if(success) await this.toState({ cep: value, cepLoading: false, shippingValue, cepSuccess: true })
    else this.toState({ cepLoading: false, cepError: msg });
  }

  handleRemoveSubscription() {
    const { removeSubscriptionCartAction } = this.getProps();
    removeSubscriptionCartAction();
  }
}