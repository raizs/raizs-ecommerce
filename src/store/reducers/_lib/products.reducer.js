import { SET_PRODUCTS, SET_POPULAR_PRODUCTS } from "../../actions";
import { Cache } from "../../../helpers";
import { Products } from "../../../entities";

const cachedProducts = Cache.getItem('products');
const cachedPopularProducts = Cache.getItem('popularProducts');

const initialState = {
	model: cachedProducts ? new Products(cachedProducts) : null,
	popularProducts: cachedPopularProducts ? new Products(cachedPopularProducts) : null
};

export const productsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				model: action.data
			};
		case SET_POPULAR_PRODUCTS:
			return {
				...state,
				popularProducts: action.data
			};
		default:
			return state;
	}
};

