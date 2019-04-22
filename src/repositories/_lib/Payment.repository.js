import { BaseRepository } from './Base.repository';

export class PaymentRepository extends BaseRepository {

  createCard(body) {
    return this.post('payment/createCreditCard', body);
  }
}