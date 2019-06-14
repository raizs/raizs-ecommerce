import { UPDATE_CART } from "../../actions";
import { Cache, MiniDatePickerHelper } from "../../../helpers";
import { Cart } from "../../../entities";

const selectedDate = MiniDatePickerHelper.generateDatesObject()[0].stockDate;

const cachedCart = Cache.getItem('cart');

const initialState = {
	current: cachedCart ? new Cart({ items: cachedCart, selectedDate }) : new Cart({ selectedDate })
};

export const cartReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_CART:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

