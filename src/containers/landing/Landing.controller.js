import { BaseController } from "../../helpers";

export class LandingController extends BaseController {
  constructor ({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();

    const newCart = cart.update(item, quantity);
    updateCartAction(newCart);
  }
}