import { Cache } from "../../../helpers";

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategoriesAction = categories => {
  Cache.setItem('categories', categories.original);

  return {
    type: SET_CATEGORIES,
    data: categories
  }
};
