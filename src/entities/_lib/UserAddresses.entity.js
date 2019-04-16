import { BaseModel } from '../../helpers';
import { UserAddress } from '..';

export class UserAddresses extends BaseModel {
  constructor(userAddresses) {
    super();
    
    this.original = userAddresses;
    this.all = userAddresses.map(userAddress => new UserAddress(userAddress));
  }

  add(newUserAddress) {
    return this.baseAdd(newUserAddress, this.original, UserAddresses);
  }
}