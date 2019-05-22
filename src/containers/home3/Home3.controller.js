import { BaseController } from "../../helpers";

export class Home3Controller extends BaseController {
  constructor({ toState, getProps, getState }) {
    super({ toState, getProps, getState });

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }
}