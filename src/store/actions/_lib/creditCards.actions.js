import { Cache } from "../../../helpers";

export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';
export const SELECT_CREDIT_CARD = 'SELECT_CREDIT_CARD';

export const setCreditCardsAction = creditCards => {
  if(creditCards) Cache.setItem('creditCards', creditCards.original);
  else Cache.removeItem('creditCards');

  return {
    type: SET_CREDIT_CARDS,
    data: creditCards
  }
};

export const selectCreditCardAction = creditCard => ({
  type: SELECT_CREDIT_CARD,
  data: creditCard
});
