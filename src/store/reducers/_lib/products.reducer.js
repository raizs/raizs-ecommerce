import { SET_PRODUCTS, SET_POPULAR_PRODUCTS, SET_NEW_PRODUCTS, SET_CURRENT_PRODUCT } from "../../actions";
import { Cache } from "../../../helpers";
import { Products } from "../../../entities";

const cachedProducts = Cache.getItem('products');
const cachedPopularProducts = Cache.getItem('popularProducts');
const cachedNewProducts = Cache.getItem('newProducts');

const initialState = {
	model: cachedProducts ? new Products(cachedProducts) : new Products([]),
	popularProducts: cachedPopularProducts ? new Products(cachedPopularProducts) : new Products([]),
	newProducts: cachedNewProducts ? new Products(cachedNewProducts) : new Products([]),
	currentProduct: "NADA AINDA"
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
		case SET_NEW_PRODUCTS:
			return {
				...state,
				newProducts: action.data
			};
		case SET_CURRENT_PRODUCT:
			return {
				...state,
				currentProduct: action.data
			};
		default:
			return state;
	}
};

