export const SET_SALE_ORDERS = 'SET_SALE_ORDERS';
export const SELECT_SALE_ORDER = 'SELECT_SALE_ORDER';

export const setSaleOrdersAction = orders => ({
  type: SET_SALE_ORDERS,
  data: orders
});

export const selectSaleOrderAction = order => ({
  type: SELECT_SALE_ORDER,
  data: order
});