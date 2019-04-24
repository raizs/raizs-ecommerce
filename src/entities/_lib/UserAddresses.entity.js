import { BaseModel } from '../../helpers';
import { UserAddress } from '..';

export class UserAddresses extends BaseModel {
  constructor(users) {
    super();
    
    this.original = users;
    this.all = users.map(user => new UserAddress(user));

    this.hasAddresses = this.all.length > 1 || this._checkAddress(this.all[0]);
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

  _checkAddress(address) {
    return address.name && address.address && address.receiverName;
  }
}