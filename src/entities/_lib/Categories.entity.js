import { BaseModel } from '../../helpers';
import { Category } from '..';

export class Categories extends BaseModel {
  constructor(categories) {
    super();
    
    this.original = categories;
    this.all = categories
    .filter(category => !category.parent_id)
    .map(category => new Category(category));
    
    this.subcategories = categories
    .filter(category => !!category.parent_id)
    .map(category => new Category(category));
  }
}