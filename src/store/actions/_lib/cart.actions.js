import { Cache } from "../../../helpers";

export const UPDATE_CART = 'UPDATE_CART';

export const updateCartAction = cart => {
  Cache.setItem('cart', cart.items);

  return {
    type: UPDATE_CART,
    data: cart
  }
};
