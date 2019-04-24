import { SET_CREDIT_CARDS, SELECT_CREDIT_CARD } from "../../actions";
import { Cache } from "../../../helpers";
import { CreditCards } from "../../../entities";

const cachedCreditCards = Cache.getItem('creditCards');
const model = cachedCreditCards ? new CreditCards(cachedCreditCards) : new CreditCards([]);

const initialState = {
	model,
	selected: model.all.length ? model.getDefaultCreditCard() : null
};

export const creditCardsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CREDIT_CARDS:
			return {
				...state,
				model: action.data || new CreditCards([])
			};
		case SELECT_CREDIT_CARD:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

