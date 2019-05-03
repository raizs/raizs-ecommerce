import { SET_CARDS, SELECT_CARD } from "../../actions";
import { Cache } from "../../../helpers";
import { Cards } from "../../../entities";

const cachedCards = Cache.getItem('cards');
const model = cachedCards ? new Cards(cachedCards) : new Cards([]);

const initialState = {
	model,
	selected: model.all.length ? model.getDefaultCard() : null
};

export const creditCardsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CARDS:
			return {
				...state,
				model: action.data || new Cards([])
			};
		case SELECT_CARD:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

