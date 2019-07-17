import { SET_CATEGORIES } from "../../actions";
import { Cache } from "../../../helpers";
import { Categories } from "../../../entities";

const cachedCategories = Cache.getItem('categories') || [];
console.log("CACHED",cachedCategories)

const initialState = {
	model: cachedCategories ? new Categories(cachedCategories) : null
};

export const categoriesReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				model: action.data
			};
		default:
			return state;
	}
};

