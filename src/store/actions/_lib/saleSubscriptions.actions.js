export const SET_SALE_SUBSCRIPTIONS = 'SET_SALE_SUBSCRIPTIONS';
export const SELECT_SALE_SUBSCRIPTION = 'SELECT_SALE_SUBSCRIPTION';

export const setSaleSubscriptionsAction = subscriptions => ({
  type: SET_SALE_SUBSCRIPTIONS,
  data: subscriptions
});

export const selectSaleSubscriptionAction = subscription => ({
  type: SELECT_SALE_SUBSCRIPTION,
  data: subscription
});