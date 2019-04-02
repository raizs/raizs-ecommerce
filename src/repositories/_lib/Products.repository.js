import { BaseRepository } from './Base.repository';

export class ProductsRepository extends BaseRepository {

  fetchProducts() {
    return this.get('products');
  }
}