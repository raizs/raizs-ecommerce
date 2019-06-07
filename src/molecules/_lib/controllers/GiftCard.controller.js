import { BaseController } from '../../../helpers';
import { GiftCardRepository } from "../../../repositories"


export class GiftCardController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.giftCardRepo = new GiftCardRepository()
    this.getGiftCardValue = this.getGiftCardValue.bind(this);
    this.getCheckoutTotals = this.getCheckoutTotals.bind(this);
    this.handleGiftCard = this.handleGiftCard.bind(this);
  }

  handleGiftCard(){
    const { setGiftCardAction, giftCard } = this.getProps();
    const { value, id } = this.getState();
    if (giftCard.value) setGiftCardAction({});
    else setGiftCardAction({value, id})

  }    

  getCheckoutTotals(){
    const { cart, subscriptionCart, coupon } = this.getProps();
    let couponValue = 0;
    if (coupon){
      couponValue = coupon.calculateDiscount(cart, subscriptionCart)   
    }
    let total = cart.subtotal + subscriptionCart.current.subtotal - couponValue;

    return total

  }

  async getGiftCardValue(){
    const { user } = this.getProps();
    const promise = await this.giftCardRepo.getGiftCard(user.id);
    const value = Math.min(promise.data.value, this.getCheckoutTotals())
    this.toState({ value, id:promise.data.id })

  }
}
