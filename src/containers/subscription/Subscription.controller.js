import { BaseController } from "../../helpers";

export class SubscriptionController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateSubscriptionCart = this.handleUpdateSubscriptionCart.bind(this);
  }

  handleUpdateSubscriptionCart({ item, quantity }) {
    const { subscriptionCart, updateSubscriptionCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, subscriptionCart, updateSubscriptionCartAction);
  }
}