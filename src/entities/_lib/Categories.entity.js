import sortby from 'lodash.sortby';

import { BaseModel } from '../../helpers';
import { Category } from '..';

export class Categories extends BaseModel {
  constructor(categories) {
    super();
    
    this.original = categories;
    this.originalFiltered = categories.filter(({ id, parent_id }) => this._filterCategories(id, parent_id));

    this.all = categories.map(category => new Category(category));
    this.allFiltered = categories.filter(({ id, parent_id }) => this._filterCategories(id, parent_id));

    this.supcategories = this.originalFiltered
    .filter(category => !category.parent_id)
    .map(category => new Category(category));
    
    this.subcategories = this.originalFiltered
    .filter(category => !!category.parent_id)
    .map(category => new Category(category));

    this.timelineObj = this._toSideTimeline(this.supcategories, this.subcategories);

    this.catalogSectionsArr = this._toCatalogSections(this.supcategories, this.subcategories);
  }

  _filterCategories(id, parentId) {
    return [4, 10, 24, 29, 37].includes(id) || [4, 10, 24, 29, 37].includes(parentId);
    // return [4].includes(id) || [4].includes(parentId);
  }

  _toSideTimeline(supcategories, subcategories) {
    const obj = {};

    supcategories.forEach(supcategory => {
      obj[supcategory.timelineId] = {
        label: supcategory.name,
        id: supcategory.timelineId,
        url: supcategory.timelineUrlId,
        order: supcategory.order,
        isCollapsible: true
      };

      subcategories
        .filter(subcategory => subcategory.parentId === supcategory.id)
        .forEach(subcategory => {
          if(!obj[supcategory.timelineId].collapse) {
            obj[supcategory.timelineId].collapse = [];
          }

          obj[supcategory.timelineId].collapse.push({
            label: subcategory.name,
            id: subcategory.timelineId,
            url: subcategory.timelineUrlId
          })
        })
    });

    return sortby(obj, 'order');
  }

  _toCatalogSections(supcategories, subcategories) {
    const arr = [];

    supcategories.forEach(supcategory => {
      let obj = {};

      obj.id = supcategory.timelineId;
      obj.parentName = supcategory.name;
      obj.order = supcategory.order;
      
      subcategories
      .filter(subcategory => subcategory.parentId === supcategory.id)
      .forEach(subcategory => {
        if(!obj.subcategories) {
          obj.subcategories = [];
        }
      
        obj.subcategories.push({
          title: subcategory.name,
          id: subcategory.timelineId,
          parentId: supcategory.id,
          subcategoryId: subcategory.id
        });
      })
      
      arr.push(obj);
    });

    return sortby(arr, 'order');
  }
}