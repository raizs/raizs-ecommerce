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

  update(id, update) {
    return this.baseUpdate(id, this.original, UserAddresses, update);
	}

  getById(id) {
    let item = null;

    if(typeof id === 'string') id = parseInt(id);

    this.all.forEach(userAddress => {
      if(userAddress.id === id) item = userAddress;
    });
    return item;
  }

  getDefaultUserAddress() {
    for(let ua of this.all) {
      if(ua.isDefaultAddress) return ua;
    }
    return null;
  }

  fixDefaultAddress(id) {
    let copy = this.original;
    for(let ua of copy) {
      if(ua.id !== id) ua.isDefaultAddress = false;
    }
    return new UserAddresses(copy);
  }
}