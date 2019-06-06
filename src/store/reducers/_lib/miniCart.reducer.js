import { SET_MINICART_SECTION } from "../../actions";

const initialState = {
	currentSection: 'cart'
};

export const miniCartReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_MINICART_SECTION:
			return {
				...state,
				currentSection: action.data
			};
		default:
			return state;
	}
};

