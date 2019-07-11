export const UPDATE_CART = 'UPDATE_CART';

export const updateCartAction = cart => {
  return {
    type: UPDATE_CART,
    data: cart
  }
};
