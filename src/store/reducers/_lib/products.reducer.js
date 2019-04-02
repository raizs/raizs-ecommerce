import { SET_PRODUCTS } from "../../actions";
import { Cache } from "../../../helpers";
import { Products } from "../../../entities";

const cachedProducts = Cache.getItem('products');

const initialState = {
	model: cachedProducts ? new Products(cachedProducts) : null
};

export const productsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				model: action.data
			};
		default:
			return state;
	}
};

