import { Cache } from "../../../helpers";

export const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';
export const SELECT_SUBSCRIPTION = 'SELECT_SUBSCRIPTION';

export const setSubscriptionsAction = subsctiptions => {
  if(subsctiptions) Cache.setItem('subsctiptions', subsctiptions.original);
  else Cache.removeItem('subsctiptions');

  return {
    type: SET_SUBSCRIPTIONS,
    data: subsctiptions
  }
};

export const selectSubscriptionAction = subsctiption => ({
  type: SELECT_SUBSCRIPTION,
  data: subsctiption
});