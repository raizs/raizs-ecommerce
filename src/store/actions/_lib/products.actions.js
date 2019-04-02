import { Cache } from "../../../helpers";

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProductsAction = products => {
  Cache.setItem('products', products.original);

  return {
    type: SET_PRODUCTS,
    data: products
  }
};
