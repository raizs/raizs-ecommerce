import React from "react";
import { Formatter } from "./Formatter";
import { MiniDatePickerHelper } from "./MiniDatePicker.helper";
import { CartRepository } from "../../repositories";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

export default class BaseController {
	constructor({ toState, getState, getProps }) {
		this.toState = toState;
		this.getState = getState;
    this.getProps = getProps;
    
    this.timeout = null;
	}

	baseHandleChange(e, format, errors = {}) {
		const { id } = e.target;
		let { value } = e.target;

		if(format) value = Formatter[format](value);

		return { [id]: value, errors: { ...errors, [id]: '' } };
	}
	
	baseHandleCheckboxChange(id, currentValue) {
		return { [id]: !currentValue };
	}
	
	async baseHandleUpdateCart(
    { item, quantity, periodicity, secondaryPeriodicity },
    cart,
    updateCartAction,
    selectedDate,
    cookies,
    isSub = false
  ) {
    const newCart = cart.update({ product: item, quantity, periodicity, secondaryPeriodicity, selectedDate });
    updateCartAction(newCart);

    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      const repo = new CartRepository();
      await repo.update(newCart.getCookie());
    }, 5000);
    
    if(!isSub) {
      const cookieSubCart = cookies.get('subCart');
      cookies.set('cart', newCart.getCookie(), { path: '/', maxAge: 7200 });
      cookies.set('subCart', cookieSubCart, { path: '/', maxAge: 7200 });
    }
    else {
      const cookieCart = cookies.get('cart');
      cookies.set('cart', cookieCart, { path: '/', maxAge: 7200 })
      cookies.set('subCart', newCart.getCookie(), { path: '/', maxAge: 7200 })
    }
	}

	baseHandleSelectDate({
		selected,
		selectDateAction,
		selectedDate,
		cart,
		subscriptionCart,
		openCartWarningModalAction,
		Cart,
    SubscriptionCart,
    updateCartAction,
    updateSubscriptionCartAction
	}) {
		const dates = MiniDatePickerHelper.generateDatesObject();

    const oldDate = dates[selectedDate];
    const oldStockDate = oldDate.stockDate;
    const newDate = dates[selected];
    const newStockDate = newDate.stockDate;
    
    const cartInfo = cart.checkNewDate(oldStockDate, newStockDate);
    const subscriptionCartInfo = subscriptionCart.checkNewDate(oldStockDate, newStockDate);
    
    if(cartInfo.length || subscriptionCartInfo.length) {
      let newCart, newSubscriptionCart;
      if(cartInfo.length) {
        newCart = new Cart({ items: cart.items, selectedDate: newDate, id: cart.id });
        cartInfo.forEach(diff =>
          newCart = newCart.update({ product: diff.product, quantity: diff.newQuantity })
        );
        updateCartAction(newCart);
      }
      
      if(subscriptionCartInfo.length) {
        newSubscriptionCart = new SubscriptionCart({ items: cart.items, selectedDate: newDate, id: subscriptionCart.id });
        subscriptionCartInfo.forEach(diff => {
          newSubscriptionCart = newSubscriptionCart.update({ product: diff.product, quantity: diff.newQuantity })
        });
        updateSubscriptionCartAction(newSubscriptionCart);
      }

      toast(
        <div>
          <p style={{ color: 'white' }}>Um ou mais itens de seu carrinho foram alterados devido à mudança de data.</p>
          <Button
            id='review-cart'
            style={{
              marginTop: '8px',
              marginBottom: '8px',
              borderRadius: '8px',
              fontWeight: 700,
              float: 'right',
              backgroundColor: 'transparent',
              border: '1px solid white'
            }}
            onClick={() => {
              openCartWarningModalAction({
                cartInfo,
                oldCart: cart,
                subscriptionCartInfo,
                oldSubscriptionCart: subscriptionCart,
                oldDate,
                newDate,
                oldSelectedDate: selectedDate
              });
            }} >
              <span style={{ color: 'white' }}>Verificar</span>
            </Button>
        </div>
      , { autoClose: 10000 });
    }

    return selectDateAction(selected);
	}
}
