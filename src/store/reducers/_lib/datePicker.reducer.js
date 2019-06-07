import { SELECT_DATE } from "../../actions";
import { MiniDatePickerHelper } from "../../../helpers"

const initialState = {
	selected: 0,
	momentDate: MiniDatePickerHelper.generateDatesObject()[0].momentDate,
	obj: MiniDatePickerHelper.generateDatesObject()[0]
};

export const datePickerReducer = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_DATE:
		const momentDate = MiniDatePickerHelper.generateDatesObject()[action.data].momentDate
		const obj = MiniDatePickerHelper.generateDatesObject()[action.data]
			return {
				...state,
				selected: action.data,
				momentDate,
				obj
			};
		default:
			return state;
	}
};

