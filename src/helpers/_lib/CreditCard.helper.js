import cardValidator from 'card-validator';

export class CreditCardHelper {
  static checkNumber(number) {
    return cardValidator.number(number);
  }

  static checkExpDate(expDate) {
    return cardValidator.expirationDate(expDate);
  }
}