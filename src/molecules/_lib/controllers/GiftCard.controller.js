import { BaseController } from '../../../helpers';
import { GiftCardRepository } from "../../../repositories"

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
    const { transaction } = this.getProps();
    return Math.min(transaction.totals.toChargeNow.total, totalCredits)
  }

  async getGiftCardValue(){
    const { user, setGiftCardAction } = this.getProps();
    setGiftCardAction({})
    if (user){
      const promise = await this.giftCardRepo.getGiftCard(user.id);
      if(promise.data && promise.data.value) {
        const value =  this.getAvailableGiftCardValue(promise.data.value);
        this.toState({ value, id:promise.data.id })
      }
      
    }
  }
}
