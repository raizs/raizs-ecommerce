import { BaseModel } from '../../helpers';
import { CreditCard } from '..';

export class CreditCards extends BaseModel {
  constructor(creditCards) {
    super();
    
    this.original = creditCards;
    this.all = creditCards.map(creditCard => new CreditCard(creditCard));
  }

  add(newCreditCard) {
    return this.baseAdd(newCreditCard, this.original, CreditCards);
  }

  getById(id) {
    let item = null;
    this.all.forEach(creditCard => {
      if(creditCard.id === id) item = creditCard;
    });
    return item;
  }
}