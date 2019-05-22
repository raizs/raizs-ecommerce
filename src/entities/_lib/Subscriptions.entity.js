import { BaseModel } from '../../helpers';
import { Subscription } from '..';

export class Subscriptions extends BaseModel {
  constructor(subscriptions) {
    super();

    this.original = subscriptions;
    this.all = subscriptions.map(subscription => new Subscription(subscription));
  }

  add(newSubscription) {
    return this.baseAdd(newSubscription, this.original, Subscriptions);
  }

  getById(id) {
    let item = null;
    this.all.forEach(subscription => {
      if(subscription.id === id) item = subscription;
    });
    return item;
  }
}