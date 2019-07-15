import { BaseRepository } from './Base.repository';

export class ProductsRepository extends BaseRepository {

  fetchProducts() {
    return this.get("products");
  }

  fetchProduct(query) {
    return this.get(`product?${query}`);
  }

  fetchPopularProducts() {
    return this.get('popularProducts');
  }

  fetchNewProducts() {
    return this.get('newProducts');
  }
}