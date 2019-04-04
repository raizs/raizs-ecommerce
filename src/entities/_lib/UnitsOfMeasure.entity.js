import { BaseModel } from '../../helpers';
import { UnitOfMeasure } from '..';

export class UnitsOfMeasure extends BaseModel {
  constructor(unitsOfMeasure) {
    super();
    
    this.original = unitsOfMeasure;
    this.all = unitsOfMeasure.map(uom => new UnitOfMeasure(uom));
  }
}