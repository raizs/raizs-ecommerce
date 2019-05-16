import { BaseController } from "../../helpers";
import { toast } from "react-toastify";

export class HomeController extends BaseController {
  constructor({ toState, getProps, getState }) {
    super({ toState, getProps, getState });

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleSubmitNewsletter = this.handleSubmitNewsletter.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction);
  }

  async handleSubmitNewsletter() {
    const { newsletterEmail } = this.getState();

    this.toState({ newsletterLoading: true });
    const promise = await this.nlRepo.create({ email: newsletterEmail });

    const toState = { newsletterLoading: false };
    if(!promise.err) {
      toState.newsletterEmail = '';
      toast('E-mail adicionado com sucesso!');
    }

    this.toState(toState);
  }
}