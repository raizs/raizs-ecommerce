import { SET_PRODUCT_BRANDS } from "../../actions";
import { Cache } from "../../../helpers";
import { ProductBrands } from "../../../entities";

const cachedProductBrands = Cache.getItem('productBrands');

const initialState = {
	model: cachedProductBrands ? new ProductBrands(cachedProductBrands) : null
};

export const productBrandsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_PRODUCT_BRANDS:
			return {
				...state,
				model: action.data
			};
		default:
			return state;
	}
};

