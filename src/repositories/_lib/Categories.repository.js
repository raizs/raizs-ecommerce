import { BaseRepository } from './Base.repository';

export class CategoriesRepository extends BaseRepository {

  fetchCategories() {
    return this.get('categories');
  }
}