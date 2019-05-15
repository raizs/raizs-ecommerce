import { BaseRepository } from './Base.repository';

export class SaleOrdersRepository extends BaseRepository {

  createOrder(body) {
    return this.post('sale-orders/create', body);
  }

  getOrders(userId){
    return this.get(`sale-orders/get?user=${userId}`);
  }
}