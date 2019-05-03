import { BaseModel } from '../../helpers';
import { Card } from '..';

export class Cards extends BaseModel {
  constructor(cards) {
    super();

    this.original = cards;
    this.all = cards.map(card => new Card(card));

    this.creditCards = this.all.filter(card => card.type === 'credit');
    this.debitCards = this.all.filter(card => card.type === 'debit');

    this.getDefaultCreditCard = this.getDefaultCreditCard.bind(this);
    this.getDefaultDebitCard = this.getDefaultDebitCard.bind(this);
  }

  add(newCard) {
    return this.baseAdd(newCard, this.original, Cards);
  }

  getById(id) {
    let item = null;
    this.all.forEach(card => {
      if(card.id === id) item = card;
    });
    return item;
  }

  getDefaultCard() {
    return this.all[0];
  }

  getDefaultCreditCard() {
    return this.creditCards[0];
  }

  getDefaultDebitCard() {
    return this.debitCards[0];
  }
}