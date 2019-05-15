import { SELECT_DATE } from "../../actions";
import { MiniDatePickerHelper } from "../../../helpers"

const initialState = {
	selected: 0,
	momentDate: MiniDatePickerHelper.generateDatesObject()[0].momentDate
};

export const datePickerReducer = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_DATE:
		const momentDate = MiniDatePickerHelper.generateDatesObject()[action.data].momentDate
			return {
				...state,
				selected: action.data,
				momentDate
			};
		default:
			return state;
	}
};

