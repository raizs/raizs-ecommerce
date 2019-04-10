import { UPDATE_CART } from "../../actions";
import { Cache } from "../../../helpers";
import { Cart } from "../../../entities";

const cachedCart = Cache.getItem('cart');

const initialState = {
	current: cachedCart ? new Cart(cachedCart) : new Cart()
};

export const cartReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_CART:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

