import { Cache } from "../../../helpers";

export const UPDATE_SUBSCRIPTION_CART = 'UPDATE_SUBSCRIPTION_CART';

export const updateSubscriptionCartAction = subscriptionCart => {
  Cache.setItem('subscriptionCart', subscriptionCart.items);

  return {
    type: UPDATE_SUBSCRIPTION_CART,
    data: subscriptionCart
  }
};
