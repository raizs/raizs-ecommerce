import { BaseRepository } from './Base.repository';

export class CartRepository extends BaseRepository {

  get(id) {
    return this.get(`cart?id=${id}`);
  }

  create(body) {
    return this.post('cart', body);
  }

  update(body) {
    return this.put('cart', body);
  }
}