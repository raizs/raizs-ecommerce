import { BaseController } from '../../helpers';
import { Cart } from '../../entities';

export class CheckoutController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.toState({ [id]: value })
  }

  handleCheckbox(e) {
    const { id } = e.target;
    const value = this.getState()[id];

    console.log([e.target]);

    this.toState({ [id]: !value });
  }
}