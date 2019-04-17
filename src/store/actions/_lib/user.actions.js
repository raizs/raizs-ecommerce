import { Cache } from "../../../helpers";

export const SET_USER = 'SET_USER';

export const setUserAction = user => {
  if(user) Cache.setItem('user', user.original);
  else {
    Cache.removeItem('user');
    Cache.removeItem('cart');
  }

  return {
    type: SET_USER,
    data: user
  };
};
