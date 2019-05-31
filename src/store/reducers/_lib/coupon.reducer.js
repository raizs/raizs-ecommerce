import { SET_COUPON_ACTION } from "../../actions";

const initialState = {
	selected:null
};

export const couponReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_COUPON_ACTION:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

