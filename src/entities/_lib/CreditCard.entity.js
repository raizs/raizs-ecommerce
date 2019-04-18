export class CreditCard {
  constructor(creditCard) {
    this.original = creditCard;

    this.id = creditCard.id;
    this.idString = typeof creditCard.id === 'number' ? creditCard.id.toString() : creditCard.id;
    this.displayName = 'dummy';
  }
}