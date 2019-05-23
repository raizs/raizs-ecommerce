import { BaseController } from "../../helpers";

export class SubscriptionController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateSubscriptionCart = this.handleUpdateSubscriptionCart.bind(this);
    this.handleContinueAction = this.handleContinueAction.bind(this);
  }

  handleUpdateSubscriptionCart({ item, quantity }) {
    const { subscriptionCart, updateSubscriptionCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, subscriptionCart, updateSubscriptionCartAction);
  }

  handleContinueAction(currentObservations) {
    const { setCurrentObservationsAction, history } = this.getProps()
    setCurrentObservationsAction(currentObservations);
    history.push('/assinatura/complementos');
  }
}