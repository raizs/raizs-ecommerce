import { Cache } from "../../../helpers";

export const SET_SALE_ORDERS = 'SET_SALE_ORDERS';

export const setSaleOrdersAction = order => ({
  type: SET_SALE_ORDERS,
  data: order
});