import { SET_SHIPPING_ACTION } from "../../actions";

const initialState = {
	current: null,
};

export const shippingReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_SHIPPING_ACTION:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

