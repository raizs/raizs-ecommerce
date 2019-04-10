import { Cache } from "../../../helpers";

export const SET_PRODUCT_BRANDS = 'SET_PRODUCT_BRANDS';

export const setProductBrandsAction = productBrands => {
  Cache.setItem('productBrands', productBrands.original);

  return {
    type: SET_PRODUCT_BRANDS,
    data: productBrands
  }
};
