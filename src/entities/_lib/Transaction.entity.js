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
		this.giftCard = giftCard || { value: 0, id: null };
		this.hasSubcart = !!subcart.current.subtotal;
		this.shipping = shipping || {
			value:9.90
		}
		this.cart = cart;
		this.subcart = subcart;
		this.momentDate = momentDate||moment();
		this.donation = donation;
		this.coupon = coupon;
		this.selectedPaymentMethod = selectedPaymentMethod;
		this.totals = this.calculateCharges();
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
			singularCharges:{
				first: { },
				second: { },
				third: { },
				fourth: { },
			},
		};

		totals = this.calculateDiscounts(totals);
		totals = this.calculateShipping(totals);
		totals = this.calculateTotals(totals);
		totals = this.distributeGiftCardCharges(totals);
			
		return totals;
	}

	discountGiftCard(payment, totalValue){
		payment.giftCard = Math.min(payment.total, totalValue);
		payment.total -= payment.giftCard;
		return payment;

	}

	distributeGiftCardCharges(totals){
		let totalValue = this.giftCard.value;
		if (!totalValue) return totals;

		totals.immediate = this.discountGiftCard(totals.immediate, totalValue); 
		totalValue -= totals.immediate.giftCard; 
		let i = 0;
		while (totalValue != 0){
			let cicle = Math.floor(i/4);
			const key = recurrencyKeys[i%4];
			i++;

			let copy = {...totals.recurrencies[key]}
			if (!copy.subtotal) continue;
			copy = this.discountGiftCard(copy, totalValue); 
			totalValue -= copy.giftCard;
			totals.singularCharges[key][cicle]=copy;

		}

		return totals;
	}


	calculateTotals(totals){
		totals.immediate.total = totals.immediate.subtotal + totals.immediate.shipping - totals.immediate.coupon;
		recurrencyKeys.forEach(key=>{
			totals.recurrencies[key].total = totals.recurrencies[key].subtotal + totals.recurrencies[key].shipping - totals.recurrencies[key].coupon;
		})
		return totals;
	}



	calculateShipping(totals){
		//logica de calcular fretes;
		const  { shipping, hasSubcart } = this;
		
		if (!hasSubcart){
			totals.immediate.shipping = shipping.value;
		}
		else {
			recurrencyKeys.forEach(key=>{
				totals.recurrencies[key].shipping = totals.recurrencies[key].subtotal ?  shipping.value : 0;
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

	getEquivalentPercentageDiscount(charge){
		let discount = 100 -(100*charge.total/(charge.subtotal + charge.shipping)).toFixed(2);

		return discount;

	}

	calculateMpDiscount(week){
		const { totals } = this;
		let discounts = [];
		const charges = totals.singularCharges[week];
		console.log(charges)

		if (!charges) return discounts;
		let cicles = Object.keys(charges);
		if (!cicles.length) return discounts;
 		let commonCharge = charges["0"];
		let lastCicle = cicles.length - 1;
		let lastCharge = charges[lastCicle];
		if (commonCharge.total != lastCharge.total){
			const lastDiscount = this.getEquivalentPercentageDiscount(lastCharge);
			discounts = [
		        {
		            "cycles": lastCicle + 1,
		            "value": lastDiscount,
		            "discount_type": "percentage"
		        },
		        {
		            "cycles": lastCicle,
		            "value": 100 - lastDiscount,
		            "discount_type": "percentage"
		        },
		    ]

		}
		else {
			discounts = [
				{
					"cycles": lastCicle + 1,
		            "value": this.getEquivalentPercentageDiscount(commonCharge),
		            "discount_type": "percentage"	
				}
			]
		}

		return discounts;


	}



}