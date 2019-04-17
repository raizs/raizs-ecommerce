import { BaseModel } from '../../helpers';
import { UserAddress } from '..';

export class UserAddresses extends BaseModel {
  constructor(userAddresses) {
    super();
    
    this.original = userAddresses;
    this.all = userAddresses.map(userAddress => new UserAddress(userAddress));

    this.getById = this.getById.bind(this);
  }

  add(newUserAddress) {
    return this.baseAdd(newUserAddress, this.original, UserAddresses);
  }

  getById(id) {
    let item = null;
    this.all.forEach(userAddress => {
      if(userAddress.id === id) item = userAddress;
    });
    return item;
  }
}