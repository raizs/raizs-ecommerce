import { BaseModel, Formatter } from '../../helpers';

export class Transaction extends BaseModel {

	constructor({ cart, subcart, coupon, donation, giftCard, selectedPaymentMethod }) {

		super();
		this.cart = cart;
		this.subcart = subcart;
		this.donation = donation;
		this.coupon = coupon;
		this.selectedPaymentMethod = selectedPaymentMethod;
		this.giftCard = giftCard || {};
		this.totals = this.calculateTotals();
	}

	calculateTotals(){
		let totals = {
			immediate: {
				coupon: 0,
				giftCard:0,
				shipping:0,
				subtotal:0,
				total:0
			},
			recurrency: {
				coupon: 0,
				shipping:0,
				subtotal:0,
				total:0
			}
		}

		totals = this.calculateSubtotals(totals);
		totals = this.calculateDiscounts(totals);
		totals = this.calculateShipping(totals);
		totals = this.calculateGiftCardValue(totals);
		totals = this.calculateFinalTotals(totals)
			
		return totals;
	}

	calculateFinalTotals(totals){
		totals.recurrency.total = totals.recurrency.subtotal + totals.recurrency.shipping - totals.recurrency.coupon;
		totals.immediate.total = totals.immediate.subtotal + totals.immediate.shipping - totals.immediate.coupon - totals.immediate.giftCard;
		return totals;
	}

	calculateGiftCardValue(totals){
		const { giftCard } = this;
		if (!giftCard) return totals;

		if (!totals.recurrency.subtotal){
			totals.immediate.giftCard = giftCard.value || 0;
		}
		else if (totals.recurrency.subtotal){
			console.log(giftCard.value)
		}
		return totals;
	}

	calculateDiscounts(totals){
		if (this.coupon){
			let coupon = this.coupon.calculateDiscount(this.cart, this.subcart);
			totals.recurrency.coupon = coupon.recurrency; 
			totals.immediate.coupon = coupon.immediate; 
		}
		return totals;
	}


	calculateSubtotals(totals){
		totals.immediate.subtotal = this.cart ? this.cart.subtotal : 0;
		totals.recurrency.subtotal = this.subcart && this.subcart.current ? this.subcart.current.subtotal : 0;
		return totals;
	}

	calculateShipping(totals){
		//logica de calcular fretes;
		let shippingValue = 9.90;
		
		if (!totals.recurrency.subtotal){
			totals.immediate.shipping = shippingValue;
		}
		else {
			totals.recurrency.shipping = shippingValue;
		}

		return totals;
	}





}