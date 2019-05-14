import { SET_SALE_ORDERS } from "../../actions";

const initialState = {
	orders:null
};

export const saleOrdersReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_SALE_ORDERS:
			return {
				...state,
				orders: action.data
			};
		default:
			return state;
	}
};

