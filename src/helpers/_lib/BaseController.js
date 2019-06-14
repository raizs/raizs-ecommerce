import { Formatter } from "./Formatter";

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
}
