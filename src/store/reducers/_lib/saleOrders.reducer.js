import { SET_SALE_ORDERS, SELECT_SALE_ORDER } from "../../actions";

const initialState = {
	orders: null,
	current: null
};

export const saleOrdersReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_SALE_ORDERS:
			return {
				...state,
				orders: action.data
			};
		case SELECT_SALE_ORDER:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

