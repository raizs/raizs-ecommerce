import { BaseController } from '../../../helpers';
import { GiftCardRepository } from "../../../repositories"
import { Transaction } from "../../../entities"

export class GiftCardController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.giftCardRepo = new GiftCardRepository()
    this.getGiftCardValue = this.getGiftCardValue.bind(this);
    this.getAvailableGiftCardValue = this.getAvailableGiftCardValue.bind(this);
    this.handleGiftCard = this.handleGiftCard.bind(this);
  }

  handleGiftCard(){
    const { setGiftCardAction, giftCard } = this.getProps();
    const { value, id } = this.getState();
    if (giftCard.value) setGiftCardAction({});
    else setGiftCardAction({value, id})

  }    

  getAvailableGiftCardValue(totalCredits){
    const { cart, subscriptionCart, coupon, giftCard } = this.getProps();

    const transaction = new Transaction({ cart, subcart:subscriptionCart, coupon });

    if (!transaction.totals.recurrency.subtotal){
      return Math.min(transaction.totals.immediate.total, totalCredits)
    }

    return totalCredits;

  }

  async getGiftCardValue(){
    const { user, setGiftCardAction } = this.getProps();
    setGiftCardAction({})
    if (user){
      const promise = await this.giftCardRepo.getGiftCard(user.id);
      if(promise.data) {
        const value =  this.getAvailableGiftCardValue(promise.data.value);
        this.toState({ value, id:promise.data.id })
      }
      
    }
  }
}
