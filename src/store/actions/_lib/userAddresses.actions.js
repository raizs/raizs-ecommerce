import { Cache } from "../../../helpers";

export const SET_USER_ADDRESSES = 'SET_USER_ADDRESSES';

export const setUserAddressesAction = userAddresses => { 
  Cache.setItem('userAddresses', userAddresses.original);

  return {
    type: SET_USER_ADDRESSES,
    data: userAddresses
  }
};
