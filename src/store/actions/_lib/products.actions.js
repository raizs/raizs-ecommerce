import { Cache } from "../../../helpers";

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_POPULAR_PRODUCTS = 'SET_POPULAR_PRODUCTS';

export const setProductsAction = products => {
  Cache.setItem('products', products.original);

  return {
    type: SET_PRODUCTS,
    data: products
  }
};

export const setPopularProductsAction = products => {
  Cache.setItem('popularProducts', products.original);

  return {
    type: SET_POPULAR_PRODUCTS,
    data: products
  }
};
