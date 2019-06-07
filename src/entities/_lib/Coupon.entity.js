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

  calculateDiscount(cart, subcart){
  	const { couponType, percentageValue } = this;

  	let discount = 0;
  	switch (couponType){
  		case "percentage": {
	  		const total = cart.subtotal + subcart.current.subtotal;
	  		discount = percentageValue*total;
	  		break;

  		}
  	}
  	return discount;
  }

}


