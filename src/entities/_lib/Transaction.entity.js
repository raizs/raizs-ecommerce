import { BaseModel, Formatter } from '../../helpers';

import moment from "moment";
const recurrencyKeys = ["first", "second", "third", "fourth"];
const emptyValues = {
	items:[],
	coupon: 0,
	shipping:0,
	subtotal:0,
	total:0, 
	giftCard: 0,
	date:moment().format('YYYY-MM-DD')
}


export class Transaction extends BaseModel {

	constructor({ cart, subcart, coupon, donation, giftCard, selectedPaymentMethod, momentDate, shipping }) {
		super();
		this.shippingMinDiscount = 220;
		this.shippingDiscount = 9.90
		this.giftCard = giftCard || { value: 0, id: null };
		this.hasSubcart = !!subcart.current.subtotal;
		this.hasCart = !!cart.subtotal;
		this.shipping = shipping || {
			value:0
		}
		this.cart = cart;
		this.subcart = subcart;
		this.momentDate = momentDate || moment();
		this.donation = donation;
		this.coupon = coupon;
		this.selectedPaymentMethod = selectedPaymentMethod;
		this.totals = this.calculateCharges();
	}

	calculateShippingProgress(value){
		let { shippingMinDiscount, shipping, shippingDiscount } = this;
		if (value){

			let progress = parseInt(100*value/shippingMinDiscount);
			if (progress>100){
				return {
					shippingValue: shipping.value - shippingDiscount,
					progress:100,
					leftValue: 0
				}
			}
			else return {
				shippingValue: shipping.value,
				progress,
				leftValue: shippingMinDiscount - value
			}
		}
		return {
			shippingValue: 0,
			progress:0,
			leftValue: shippingDiscount
		}
	}

	getGroupedRecurrencies(){
		const { momentDate, subcart } = this;
		if (!momentDate) return recurrencies;
	    let filtersAndDates = subcart.current.getFiltersAndDates(momentDate);
	    
	    let recurrencies = { }
		recurrencyKeys.forEach(key=>{
			let items = this.subcart.current.items.filter(filtersAndDates[key].filter);
			let date = filtersAndDates[key].date;
			let subtotal = 0; 
			items.forEach(({ product, quantity }) => {
		      subtotal += (product.mpPrice * quantity)/100;
		    });
			recurrencies[key] = {
				...emptyValues,
				items,
				date,
				subtotal
			}
		})

		return recurrencies;
	}

	calculateGiftCard(totals){
		let { value } = this.giftCard;
		const toImmediate = Math.min((totals.immediate.subtotal + totals.immediate.shipping - totals.immediate.coupon), value)
		totals.immediate.giftCard = toImmediate;
		totals.recurrencies.first.giftCard = value - toImmediate;
		return totals;
	}

	calculateCharges(){
		const { cart, momentDate } = this;

		let totals = {
			immediate: {
				...emptyValues,
				items:cart.items,
				subtotal:cart.subtotal,
				date:momentDate.format('YYYY-MM-DD')
			},
			recurrencies: this.getGroupedRecurrencies(),
			toChargeNow: emptyValues
		};

		totals = this.calculateDiscounts(totals);
		totals = this.calculateShipping(totals);
		totals = this.calculateGiftCard(totals);
		totals = this.calculateTotals(totals);
		totals.toChargeNow = {
			coupon: totals.immediate.coupon + totals.recurrencies.first.coupon,
			total: totals.immediate.total + totals.recurrencies.first.total,
			subtotal: totals.immediate.subtotal + totals.recurrencies.first.subtotal,
			shipping: totals.immediate.shipping + totals.recurrencies.first.shipping,
			giftCard: totals.immediate.giftCard + totals.recurrencies.first.giftCard
		}
			
		return totals;
	}


	calculateTotals(totals){
		totals.immediate.total = totals.immediate.subtotal + totals.immediate.shipping - totals.immediate.coupon - totals.immediate.giftCard;
		recurrencyKeys.forEach(key=>{
			let recurrency = totals.recurrencies[key];
			totals.recurrencies[key].total = recurrency.subtotal + recurrency.shipping - recurrency.coupon - recurrency.giftCard;
		})
		return totals;
	}



	calculateShipping(totals){
		//logica de calcular fretes;
		const  { shipping, hasSubcart, hasCart } = this;
		let { immediate, recurrencies } = totals;
		
		if (!hasSubcart){
			totals.immediate.shipping = this.calculateShippingProgress(immediate.subtotal - immediate.coupon).shippingValue;
		}
		else {
			recurrencyKeys.forEach(key=>{
				let rec = recurrencies[key];
				if (key=="first" && hasCart){
					totals.recurrencies[key].shipping = this.calculateShippingProgress(immediate.subtotal + rec.subtotal - immediate.coupon - rec.coupon).shippingValue;
				}
				else{
					totals.recurrencies[key].shipping = this.calculateShippingProgress(rec.subtotal - rec.coupon).shippingValue;
				}
			})
		}

		return totals;
	}

	calculateDiscounts(totals){
		if (this.coupon){
			return this.coupon.calculateDiscount(totals);
		}
		return totals;
	}




}