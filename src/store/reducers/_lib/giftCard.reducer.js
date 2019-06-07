import { SET_GIFT_CARD_ACTION } from "../../actions";

const initialState = {
	value: 0,
	id: null
};

export const giftCardReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_GIFT_CARD_ACTION:
			return {
				...state,
				value: action.data.value,
				id:action.data.id
			};
		default:
			return state;
	}
};

