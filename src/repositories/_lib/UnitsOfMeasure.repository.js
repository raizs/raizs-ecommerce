import { BaseRepository } from './Base.repository';

export class UnitsOfMeasureRepository extends BaseRepository {

  fetchUnitsOfMeasure() {
    return this.get('uom');
  }
}