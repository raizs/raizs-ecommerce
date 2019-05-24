import { UPDATE_SUBSCRIPTION_CART, SET_CURRENT_OBSERVATIONS } from "../../actions";
import { Cache } from "../../../helpers";
import { SubscriptionCart } from "../../../entities";

const cachedSubscriptionCart = Cache.getItem('subscriptionCart');
const cachedCurrentObservations = Cache.getItem('currentObservations');

const initialState = {
	current: cachedSubscriptionCart ? new SubscriptionCart(cachedSubscriptionCart) : new SubscriptionCart(),
	currentObservations: cachedCurrentObservations || null
};

export const subscriptionCartReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SUBSCRIPTION_CART:
			return {
				...state,
				current: action.data
			};
		case SET_CURRENT_OBSERVATIONS:
			return {
				...state,
				currentObservations: action.data
			};
		default:
			return state;
	}
};

