import { BaseRepository } from './Base.repository';

export class SaleOrdersRepository extends BaseRepository {

  createOrder(body) {
    return this.post('sale-orders/create', body);
  }

  getOrders(query) {
    return this.get(`sale-orders/get?${query}`);
  }
}