import { Cache } from "../../../helpers";

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_POPULAR_PRODUCTS = 'SET_POPULAR_PRODUCTS';
export const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

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

export const setNewProductsAction = products => {
  Cache.setItem('newProducts', products.original);

  return {
    type: SET_NEW_PRODUCTS,
    data: products
  }
};

export const setCurrentProductAction = product => {
  return {
    type: SET_CURRENT_PRODUCT,
    data: product
  }
}
