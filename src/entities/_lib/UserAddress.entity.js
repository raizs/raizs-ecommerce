export class UserAddress {
  constructor(userAddress) {
    this.original = userAddress;

    this.id = userAddress.id;
    this.name = userAddress.name;
    this.receiverName = userAddress.receiverName;
    this.cep = userAddress.cep;
    this.address = userAddress.address;
    this.number = userAddress.number;
    this.complement = userAddress.complement;
    this.receiverName = userAddress.receiverName;
    this.neighbourhood = userAddress.neighbourhood;
    this.city = userAddress.city;
    this.state = userAddress.state;
    this.isDefaultAddress = userAddress.isDefaultAddress;

    this.toCheckoutForm = this._mapToCheckoutForm(userAddress);
  }

  _mapToCheckoutForm(userAddress) {
    return {
      addressCep: userAddress.cep,
      addressAddress: userAddress.address,
      addressNumber: userAddress.number,
      addressComplement: userAddress.complement,
      addressNeighbourhood: userAddress.neighbourhood,
      addressCity: userAddress.city,
      addressState: userAddress.state,
      addressIsDefault: userAddress.isDefaultAddress
    };
  }
}