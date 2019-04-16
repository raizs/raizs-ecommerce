import { Formatter } from "./Formatter";

export default class BaseController {
	constructor({ toState, getState, getProps }) {
		this.toState = toState;
		this.getState = getState;
		this.getProps = getProps;
	}

	baseHandleChange(e, format) {
    const { id } = e.target;
    let { value } = e.target;

    if(format) value = Formatter[format](value);

    return { [id]: value };
	}
	
	baseHandleCheckboxChange(id, currentValue) {
    return { [id]: !currentValue };
  }
}
