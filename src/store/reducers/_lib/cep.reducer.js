import { SET_CEP } from "../../actions";

const initialState = {
	current: null,
	shipping: null
};

export const cepReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CEP:
			return {
				...state,
				current: action.data.cep,
				shipping: action.data.shipping
			};
		default:
			return state;
	}
};

