export class UserAddress {
  constructor(user) {
    this.original = user;

    this.id = user.id;
    this.idString = typeof user.id === 'number' ? user.id.toString() : user.id;
    this.name = user.addressName;
    this.receiverName = user.receiverName;
    this.cep = user.zip;
    this.address = user.street;
    this.street = user.street;
    this.number = user.number;
    this.complement = user.street2;
    this.neighbourhood = user.district;
    this.city = user.city;
    this.state = user.state;
    this.isDefaultAddress = user.addressIsDefault;
    this.addressIsDefault = user.addressIsDefault;

    this.toCheckoutForm = this._mapToCheckoutForm(user);

    this.formattedAddress = this._formatAddress(user);
    this.formattedAddress2 = this._formatAddress2();

    this.getMpFormattedShipping = this.getMpFormattedShipping.bind(this);
  }

  _mapToCheckoutForm(user) {
    return {
      addressCep: user.zip,
      addressAddress: user.street,
      addressNumber: user.number,
      addressComplement: user.street2,
      addressNeighbourhood: user.district,
      addressCity: user.city,
      addressState: user.state,
      addressIsDefault: user.addressIsDefault
    };
  }

  _formatAddress({ street, number, street2 }) {
    let string = street;
    if(number) string += `, ${number}`;
    if(street2) string += `, ${street2}`;
    return string;
  }

  _formatAddress2() {
    const { neighbourhood, city, state } = this;
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