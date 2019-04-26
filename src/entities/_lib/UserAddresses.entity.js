import { BaseModel } from '../../helpers';
import { UserAddress } from '..';

export class UserAddresses extends BaseModel {
  constructor(user) {
    super();
    
    this.original = user;

    const users = [user];
    if(user.children && user.children.length) users.push(...user.children);

    const addresses = users.map(u => ({
      id: u.id,
      addressName: u.addressName,
      addressReceiverName: u.addressReceiverName,
      zip: u.zip,
      street: u.street,
      number: u.number,
      street2: u.street2,
      district: u.district,
      city: u.city,
      state: u.state,
      addressIsDefault : u.addressIsDefault 
    }));

    this.all = addresses.map(address => new UserAddress(address));
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