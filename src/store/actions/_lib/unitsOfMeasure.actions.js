import { Cache } from "../../../helpers";

export const SET_UNITS_OF_MEASURE = 'SET_UNITS_OF_MEASURE';

export const setUnitsOfMeasureAction = uom => {
  Cache.setItem('uom', uom.original);

  return {
    type: SET_UNITS_OF_MEASURE,
    data: uom
  }
};
