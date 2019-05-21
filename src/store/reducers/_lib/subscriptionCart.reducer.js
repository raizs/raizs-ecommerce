import { UPDATE_SUBSCRIPTION_CART } from "../../actions";
import { Cache } from "../../../helpers";
import { SubscriptionCart } from "../../../entities";

const cachedSubscriptionCart = Cache.getItem('subscriptionCart');

const initialState = {
	current: cachedSubscriptionCart ? new SubscriptionCart(cachedSubscriptionCart) : new SubscriptionCart()
};

export const subscriptionCartReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SUBSCRIPTION_CART:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

