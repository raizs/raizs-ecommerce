import { BaseRepository } from './Base.repository';

export class PayPalRepository extends BaseRepository {

  createTransaction(body) {
    return this.post('paypal/transaction', body);
  }
}