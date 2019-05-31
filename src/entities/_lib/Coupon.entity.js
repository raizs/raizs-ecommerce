import { Formatter } from "../../helpers";

export class Coupon {

  constructor(coupon) {
    this.id = coupon.id
    this.code = coupon.code 
    this.couponType = coupon.coupon_type
    this.description = coupon.description
    this.fixValue = coupon.fix_value
    this.percentageValue = coupon.percentage_value
  }

}


