import { SET_UNITS_OF_MEASURE } from "../../actions";
import { Cache } from "../../../helpers";
import { UnitsOfMeasure } from "../../../entities";

const cachedUnitsOfMeasure = Cache.getItem('uom');

const initialState = {
	model: cachedUnitsOfMeasure ? new UnitsOfMeasure(cachedUnitsOfMeasure) : null
};

export const unitsOfMeasureReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_UNITS_OF_MEASURE:
			return {
				...state,
				model: action.data
			};
		default:
			return state;
	}
};

