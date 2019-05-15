import React from 'react'
import { BaseController } from "../../helpers";
import { NewsletterTargetsRepository } from "../../repositories";
import { toast } from "react-toastify";

export class LandingController extends BaseController {
  constructor ({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.nlRepo = new NewsletterTargetsRepository();

    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleSubmitNewsletter = this.handleSubmitNewsletter.bind(this);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction } = this.getProps();

    const newCart = cart.update(item, quantity);
    updateCartAction(newCart);
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