import { BaseController } from "../../helpers";

export class FamiliesController extends BaseController {
  constructor ({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleScroll = this.handleScroll.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }

  handleScroll() {
    const top = document.querySelector('#lista').offsetTop;
    if(top) window.scrollTo({ top, behavior: 'smooth' });
  }
}