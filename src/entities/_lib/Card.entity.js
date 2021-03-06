export class Card {
  constructor(card) {
    this.original = card;

    this.id = card.id;
    this.holderName = card.holder_name;
    this.brand = card.brand;
    this.logoUrl = card.brand;
    this.finalString = `${card.brand} - final ${card.last_four_digits}`
    this.finalStringNumbers = `final ${card.last_four_digits}`
    this.type = card.metadata ? card.metadata.type : card.type;
    this.exp = `${card.exp_month}/${card.exp_year}`;

    this.getMpFormattedPayment = this.getMpFormattedPayment.bind(this);
  }

  getMpFormattedPayment({ installments = 1, recurrence = false, amount=0 }) {
    return {
      payment_method: `${this.type}_card`,
      amount,
      [`${this.type}_card`]: {
          recurrence,
          installments,
          statement_descriptor: 'Raizs Organicos',
          card_id: this.id
      }
    };
  }
}