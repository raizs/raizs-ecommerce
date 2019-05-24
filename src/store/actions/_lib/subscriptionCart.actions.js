import { Cache } from "../../../helpers";

export const UPDATE_SUBSCRIPTION_CART = 'UPDATE_SUBSCRIPTION_CART';
export const SET_CURRENT_OBSERVATIONS = 'SET_CURRENT_OBSERVATIONS';

export const updateSubscriptionCartAction = subscriptionCart => {
  Cache.setItem('subscriptionCart', subscriptionCart.items);

  return {
    type: UPDATE_SUBSCRIPTION_CART,
    data: subscriptionCart
  }
};

export const setCurrentObservationsAction = currentObservations => {
  Cache.setItem('currentObservations', currentObservations);

  return {
    type: SET_CURRENT_OBSERVATIONS,
    data: currentObservations
  }
};
