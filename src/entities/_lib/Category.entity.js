export class Category {
  constructor(category) {
    this.id = category.id;
    this.name = category.name;
    
    this.parentId = category.parent_id;
    this.parentName = category.parent_id ?
      category.complete_name.split('/')[0].trim()
      : null;
  }
}