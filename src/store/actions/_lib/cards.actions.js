import { Cache } from "../../../helpers";

export const SET_CARDS = 'SET_CARDS';
export const SELECT_CARD = 'SELECT_CARD';

export const setCardsAction = cards => {
  if(cards) Cache.setItem('cards', cards.original);
  else Cache.removeItem('cards');

  return {
    type: SET_CARDS,
    data: cards
  }
};

export const selectCardAction = card => ({
  type: SELECT_CARD,
  data: card
});