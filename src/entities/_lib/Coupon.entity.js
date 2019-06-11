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

  	switch (couponType){
      
  		case "percentage": {
        return {
          immediate: cart ? cart.subtotal*percentageValue : 0,
          recurrency: subcart && subcart.current ? subcart.current.subtotal*percentageValue : 0
        }
	  		break;
  		}

      default:{
        return {
          immediate:0, 
          recurrency:0
        }
      }

  	}
  }

}


