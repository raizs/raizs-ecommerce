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

    this.getMpFormattedPayment = this.getMpFormattedPayment.bind(this);
  }

  getMpFormattedPayment({ installments = 1, recurrence = false }) {
    return {
      payment_method: "credit_card",
      credit_card: {
          recurrence,
          installments,
          statement_descriptor: 'Raizs Organicos',
          card_id: this.id
      }
    };
  }
}