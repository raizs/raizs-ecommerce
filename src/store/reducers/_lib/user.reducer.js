import { SET_USER } from "../../actions";

const initialState = {
	current: null
};

export const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

