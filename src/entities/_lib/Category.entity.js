export class Category {
  constructor(category) {
    this.id = category.id;
    this.name = category.name;
    
    this.parentId = category.parent_id;
    this.parentName = category.parent_id ?
      category.complete_name.split('/')[0].trim()
      : null;

    this.timelineId = this._getTimelineId(category.complete_name);
    this.timelineUrlId = '#' + this.timelineId;

    this.order = !category.parent_id ? this._getOrder(this.timelineId) : null;
  }

  _getTimelineId(name) {
    return name.toLowerCase().trim().replace(/(\(|\,|\.|\)|\/)/g, '').replace(/ /g, '-');
  }

  _getOrder(timelineId) {
    return {
      'nossa-horta': 1,
      'mercearia': 2,
      'ovos-e-carnes': 3,
      'bebidas-e-laticinios': 4,
      'corpo-e-casa': 5
    }[timelineId] || 10;
  }
}
