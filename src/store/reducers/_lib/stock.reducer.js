import { SET_STOCK_ACTION } from "../../actions";

const initialState = {
	stock: null
};

export const stockReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_STOCK_ACTION:
			return {
				...state,
				stock: action.data
			};
		default:
			return state;
	}
};

