import { BaseRepository } from './Base.repository';

export class SaleSubscriptionsRepository extends BaseRepository {

  createSubscription(body) {
    return this.post('sale-subscriptions/create', body);
  }

  getSubscriptions(userId){
    return this.get(`sale-subscriptions/get?user=${userId}`);
  }
}