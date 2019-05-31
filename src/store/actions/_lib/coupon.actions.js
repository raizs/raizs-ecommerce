import { Cache } from "../../../helpers";

export const SET_COUPON_ACTION = 'SET_COUPON_ACTION';

export const setCouponAction = coupon => ({
  type: SET_COUPON_ACTION,
  data: coupon
});