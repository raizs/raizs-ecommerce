import { Cache } from "../../../helpers";

export const SET_USER_ADDRESSES = 'SET_USER_ADDRESSES';
export const SELECT_USER_ADDRESS = 'SELECT_USER_ADDRESS';

export const setUserAddressesAction = userAddresses => {
  if(userAddresses) Cache.setItem('userAddresses', userAddresses.original);
  else Cache.removeItem('userAddresses');

  return {
    type: SET_USER_ADDRESSES,
    data: userAddresses
  }
};

export const selectUserAddressAction = userAddress => {
  if(userAddress) Cache.setItem('selectedUserAddress', userAddress);
  else Cache.removeItem('selectedUserAddress');

  return {
    type: SELECT_USER_ADDRESS,
    data: userAddress
  };
};
