import { BaseModel, Formatter } from '../../helpers';

export class Transaction extends BaseModel {

	constructor({cart, subcart, coupon, donation, giftCard, shippingAmount}) {

		super();
		this.cart = cart;
		this.subcart = subcart;
		this.donation = donation || { value: 10.00 };
		this.coupon = coupon;
		this.giftCard = giftCard || { value: 40.00};
		this.total = this.calculateTotals();
	}


	applyCoupon(imediateValue, recurrencyValue){
		const { coupon } = this;
		//aqui devemos calcular o desconto de acordo com o tipo de desconto

		// if (coupon){
		// 	switch(coupon.type){
		// 		case "percentage":{
		// 			value = value * (1 - coupon.value); break;
		// 		}
		// 		case "fix":{
		// 			value -= coupon.value; break;
		// 		}
		// 	}
		// }

		return { imediateValue, recurrencyValue };
		
	}

	applyGiftCard(value){
		const { giftCard } = this;
		if (giftCard){
			if (value > giftCard.value){
				value -= giftCard.value;
				this.updateGiftCardBalance(giftCard.value);
			}
		}
		return value;
		
	}

	calculateTotals(){

		//imediateValue é o valor total que será cobrado a vista
		//recurrencyValue é o valor total que sera cobrado periodicamente

		const { donation } = this;
		
		let { recurrencyValue, imediateValue } = this.calculateTotalsWithDiscounts();
		const { imediateShipping, recurrencyShipping } = this.getShippingTotals();
		let commonCharge = 0;
		let firstCharge = 0;

		if (imediateValue && !recurrencyValue){
			if (donation){
				imediateValue += donation.value;
			}
			imediateValue = this.applyGiftCard(imediateValue);
			imediateValue += imediateShipping
			return;

		}

		commonCharge = recurrencyValue + recurrencyShipping;

		if (recurrencyValue && !imediateValue){
			//aplicar doações e descontos (gift card e cupom (???? cupom nao faz sentido)) na primeira venda e atualizar a subscription dele na semana seguinte
			firstCharge = recurrencyValue;
			if (donation){
				firstCharge += donation.value;
			}
			firstCharge = this.applyGiftCard(firstCharge);
		}

		if (recurrencyValue && imediateValue){
			if (donation){
				firstCharge += donation.value;
			}
			firstCharge = this.applyGiftCard(firstCharge);
		}
		//damos o update na subscription, ou fazemos uma cobrança a parte e soh cobramos a subscription na outra semana?
		// casos paypal e rede podem ser diferentes 



	}

	calculateTotalsWithDiscounts(){
		let imediateValue = this.calculateCartTotals();
		let recurrencyValue = this.calculateSubcartTotals();
		return this.applyCoupon(imediateValue, recurrencyValue);
	}

	calculateCartTotals(){
		if (this.cart && this.cart.subtotal){
			return this.cart.subtotal
		}

		return 0;
	}

	calculateSubcartTotals(){
		if (this.subcart && this.subcart.current && this.subcart.current.subtotal){
			return this.subcart.current.subtotal;
		}

		return 0;
	}

	updateGiftCardBalance(){
		console.log("UPDATING BALANCE")
	}

	getShippingTotals(cart, subcart){

		// aqui verificaremos se os pedidos avulsos e de assinatura tem datas de entrega no mesmo dia, e assim cobraremos
		// soh na subscription nesse caso. Se forem dias da semana diferentes, cobraremos 2 taxas
		return { imediateShipping: 0, recurrencyShipping:9.90 }
	}





}