import { BaseRepository } from './Base.repository';

export class ProductsRepository extends BaseRepository {

  fetchProducts() {
    return this.get("products");
  }

  fetchProduct(id) {
    return this.get(`product?productId=${id}`);
  }

  fetchPopularProducts() {
    return this.get('popularProducts');
  }

  fetchNewProducts() {
    return this.get('newProducts');
  }
}