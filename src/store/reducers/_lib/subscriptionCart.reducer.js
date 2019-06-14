import {
	UPDATE_SUBSCRIPTION_CART,
	SET_CURRENT_OBSERVATIONS,
	SET_SUBSCRIPTION_NAME,
	ADD_SUBSCRIPTION_CART,
	REMOVE_SUBSCRIPTION_CART
} from "../../actions";
import { Cache, MiniDatePickerHelper } from "../../../helpers";
import { SubscriptionCart } from "../../../entities";

const selectedDate = MiniDatePickerHelper.generateDatesObject()[0].stockDate;

const cachedSubscriptionCart = Cache.getItem('subscriptionCart');
const cachedCurrentObservations = Cache.getItem('currentObservations');
const cachedSubscriptionName = Cache.getItem('subscriptionName');
const cachedIsSubscriptionCartAdded = Cache.getItem('isSubscriptionCartAdded');

const current = cachedSubscriptionCart ?
	new SubscriptionCart({ items: cachedSubscriptionCart, selectedDate }) :
	new SubscriptionCart({ hasEdited: false, selectedDate });

const initialState = {
	current,
	currentObservations: cachedCurrentObservations || null,
	subscriptionName: cachedSubscriptionName || '',
	isAdded: cachedIsSubscriptionCartAdded || false
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
		case SET_SUBSCRIPTION_NAME:
			return {
				...state,
				subscriptionName: action.data
			};
		case ADD_SUBSCRIPTION_CART:
			return {
				...state,
				isAdded: true
			};
		case REMOVE_SUBSCRIPTION_CART:
			return {
				...state,
				isAdded: false
			};
		default:
			return state;
	}
};

