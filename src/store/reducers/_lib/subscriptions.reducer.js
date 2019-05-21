import { SET_SUBSCRIPTIONS, SELECT_SUBSCRIPTION } from "../../actions";
import { Cache } from "../../../helpers";
import { Subscriptions } from "../../../entities";

const cachedSubscriptions = Cache.getItem('subscriptions');
const model = cachedSubscriptions ? new Subscriptions(cachedSubscriptions) : new Subscriptions([]);

const initialState = {
	model,
	selected: model.all.length ? model.getDefaultSubscription() : null
};

export const subscriptionsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_SUBSCRIPTIONS:
			return {
				...state,
				model: action.data || new Subscriptions([])
			};
		case SELECT_SUBSCRIPTION:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

