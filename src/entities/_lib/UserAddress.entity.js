export class UserAddress {
  constructor(userAddress) {
    this.original = userAddress;

    this.id = userAddress.id;
    this.idString = typeof userAddress.id === 'number' ? userAddress.id.toString() : userAddress.id;
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

    this.formattedAddress = this._formatAddress(userAddress);
    this.formattedAddress2 = this._formatAddress2(userAddress);

    this.getMpFormattedShipping = this.getMpFormattedShipping.bind(this);
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

  _formatAddress({ address, number, complement }) {
    let string = address;
    if(number) string += `, ${number}`;
    if(complement) string += `, ${complement}`;
    return string;
  }

  _formatAddress2({ neighbourhood, city, state }) {
    return `${neighbourhood}, ${city} - ${state}`;
  }

  getMpFormattedShipping() {
    return {
      amount: 990,
      description: this.name,
      recipient_name: this.receiverName,
      address: {
          line_1: this.formattedAddress,
          zip_code: this.cep,
          city: this.city,
          state: this.state,
          country: "BR"
      }
    };
  }
}