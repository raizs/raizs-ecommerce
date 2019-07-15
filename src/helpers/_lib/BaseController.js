import { Formatter } from "./Formatter";
import { MiniDatePickerHelper } from "./MiniDatePicker.helper";
import { CartRepository } from "../../repositories";

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
      cookies.set('cart', newCart.getCookie(), { path: '/', maxAge: 3600 });
      cookies.set('subCart', cookieSubCart, { path: '/', maxAge: 3600 });
    }
    else {
      const cookieCart = cookies.get('cart');
      cookies.set('cart', cookieCart, { path: '/', maxAge: 3600 })
      cookies.set('subCart', newCart.getCookie(), { path: '/', maxAge: 3600 })
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
		SubscriptionCart
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
        newCart = new Cart({ items: cart.items, selectedDate: newDate });
        cartInfo.forEach(diff =>
          newCart = newCart.update({ product: diff.product, quantity: diff.newQuantity })
        );
      }

      if(subscriptionCartInfo.length) {
        newSubscriptionCart = new SubscriptionCart({ items: cart.items, selectedDate: newDate });
        subscriptionCartInfo.forEach(diff => {
          newSubscriptionCart = newSubscriptionCart.update({ product: diff.product, quantity: diff.newQuantity })
        });
      }
      
      return openCartWarningModalAction({
        cartInfo,
        newCart,
        subscriptionCartInfo,
        newSubscriptionCart,
        oldDate,
        newDate,
        selectedDate: selected
      });
    }

    return selectDateAction(selected);
	}
}
