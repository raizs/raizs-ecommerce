import { SET_SALE_SUBSCRIPTIONS, SELECT_SALE_SUBSCRIPTION } from "../../actions";

const initialState = {
	subscriptions: null,
	current: null
};

export const saleSubscriptionsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_SALE_SUBSCRIPTIONS:
			return {
				...state,
				orders: action.data
			};
		case SELECT_SALE_SUBSCRIPTION:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

