import { Formatter } from "./Formatter";
import { MiniDatePickerHelper } from "./MiniDatePicker.helper";

export default class BaseController {
	constructor({ toState, getState, getProps }) {
		this.toState = toState;
		this.getState = getState;
		this.getProps = getProps;
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
	
	baseHandleUpdateCart({ item, quantity, periodicity, secondaryPeriodicity }, cart, updateCartAction, selectedDate) {
		const newCart = cart.update({ product: item, quantity, periodicity, secondaryPeriodicity, selectedDate });
		updateCartAction(newCart);
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
