import { BaseController } from "../../helpers";

export class SubscriptionController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateSubscription = this.handleUpdateSubscription.bind(this);
  }

  handleUpdateSubscription() {
    
  }
}