import { BaseRepository } from './Base.repository';

export class PaymentRepository extends BaseRepository {

  createCard(body) {
    return this.post('payment/createCard', body);
  }

  listCards(customer_id) {
    return this.get(`payment/cards?customer_id=${customer_id}`);
  }

  createOrder(body) {
    return this.post('payment/createOrder', body);
  }
}