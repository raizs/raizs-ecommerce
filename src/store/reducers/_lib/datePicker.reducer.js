import { SELECT_DATE } from "../../actions";

const initialState = {
	selected: 0
};

export const datePickerReducer = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_DATE:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

