const recurrencyKeys = ["first", "second", "third", "fourth"];

export class Coupon {

  constructor(coupon) {
    this.id = coupon.id
    this.code = coupon.code 
    this.couponType = coupon.coupon_type
    this.description = coupon.description
    this.fixValue = coupon.fix_value
    this.percentageValue = coupon.percentage_value
  }

  calculateDiscount(totals) {
  	const { couponType, percentageValue } = this;

  	switch (couponType) {
  		case "percentage": {
          totals.immediate.coupon = +(totals.immediate.subtotal*percentageValue).toFixed(2);
          recurrencyKeys.forEach(key=>{
            totals.recurrencies[key].coupon = +(totals.recurrencies[key].subtotal*percentageValue).toFixed(2) 
          })
	  		break;
      }
      default: break;
  	}
    return totals;
  }
}


