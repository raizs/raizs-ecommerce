import { BaseRepository } from './Base.repository';

export class ProductBrandsRepository extends BaseRepository {

  fetchProductBrands() {
    return this.get('product-brands');
  }
}