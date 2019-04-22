export class CreditCard {
  constructor(creditCard) {
    this.original = creditCard;

    this.id = creditCard.id;
    this.holderName = creditCard.holder_name;
    this.brand = creditCard.brand;
    this.logoUrl = creditCard.brand;
    this.finalString = `${creditCard.brand} - final ${creditCard.last_four_digits}`
    this.brand = creditCard.brand;
    this.brand = creditCard.brand;
  }
}