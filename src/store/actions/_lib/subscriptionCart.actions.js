import { Cache } from "../../../helpers";

export const UPDATE_SUBSCRIPTION_CART = 'UPDATE_SUBSCRIPTION_CART';
export const SET_CURRENT_OBSERVATIONS = 'SET_CURRENT_OBSERVATIONS';
export const SET_SUBSCRIPTION_NAME = 'SET_SUBSCRIPTION_NAME';
export const ADD_SUBSCRIPTION_CART = 'ADD_SUBSCRIPTION_CART';
export const REMOVE_SUBSCRIPTION_CART = 'REMOVE_SUBSCRIPTION_CART';

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

export const setSubscriptionNameAction = subscriptionName => {
  Cache.setItem('subscriptionName', subscriptionName);

  return {
    type: SET_SUBSCRIPTION_NAME,
    data: subscriptionName
  }
};

export const addSubscriptionCartToCartAction = () => {
  Cache.setItem('isSubscriptionCartAdded', true);

  return {
    type: ADD_SUBSCRIPTION_CART,
  }
};

export const removeSubscriptionCartAction = () => {
  Cache.setItem('isSubscriptionCartAdded', false);

  return {
    type: REMOVE_SUBSCRIPTION_CART,
  }
};

