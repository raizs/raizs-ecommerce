export class Card {
  constructor(card) {
    this.original = card;

    this.id = card.id;
    this.holderName = card.holder_name;
    this.brand = card.brand;
    this.logoUrl = card.brand;
    this.finalString = `${card.brand} - final ${card.last_four_digits}`
    this.brand = card.brand;
    this.type = card.metadata ? card.metadata.type : card.type;

    this.getMpFormattedPayment = this.getMpFormattedPayment.bind(this);
  }

  getMpFormattedPayment({ installments = 1, recurrence = false }) {
    return {
      payment_method: `${this.type}_card`,
      [`${this.type}_card`]: {
          recurrence,
          installments,
          statement_descriptor: 'Raizs Organicos',
          card_id: this.id
      }
    };
  }
}