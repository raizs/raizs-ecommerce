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
	
	baseHandleUpdateCart({ item, quantity }, cart, updateCartAction) {
		const newCart = cart.update(item, quantity);
		updateCartAction(newCart);
	}
}
