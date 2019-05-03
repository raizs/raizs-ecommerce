import { Formatter } from "./Formatter";

export class StateToApi {

  static createUserFromGoogleSignIn(firebaseUser) {
    const body = {
      email: firebaseUser.email,
      fuid: firebaseUser.uid,
      customer: true
    };

    if(firebaseUser.displayName) {
      body.name = firebaseUser.displayName;
      body.lastName = firebaseUser.displayName.split(' ').pop()
    }

    if(firebaseUser.phoneNumber) {
      body.phone = firebaseUser.phoneNumber;
    }

    return body;
  }

  static updateFirebaseUser(values) {
    return {
      email: values.signupEmail,
      phoneNumber: `+55${Formatter.extractNumbers(values.signupCellphone)}`,
      password: values.signupPassword,
      displayName: values.signupName
    };
  }

  static signupUser(values) {
    return {
      name: values.signupName,
      lastName: values.signupLastName,
      cnpjCpf: parseInt(Formatter.extractNumbers(values.signupCpf)),
      email: values.signupEmail,
      phone: Formatter.extractNumbers(values.signupCellphone),
      password: values.signupPassword,
      customer: true
    };
  }

  static createAddressCheckout(values) {
    const to = {
      addressName: values.addressName,
      addressReceiverName: values.addressReceiverName,
      zip: values.addressCep,
      street: values.addressAddress,
      number: values.addressNumber,
      street2: values.addressComplement,
      district: values.addressNeighbourhood,
      city: values.addressCity,
      state: values.addressState,
      addressIsDefault: values.addressIsDefault
    };

    if(values.parentId) {
      to.name = values.addressReceiverName;
      to.parentId = values.parentId;
    }

    return to;
  }

  static createCard(values, type) {
    return {
      toMundipagg: {
        number: values.cardNumber,
        holder_name: values.cardName,
        exp_month: values.cardExp.split('/')[0],
        exp_year: values.cardExp.split('/')[1],
        cvv: values.cardCvv,
        metadata: {
          type
        }
      },
      shouldSaveCard: values.cardShouldSave,
      customer_id: values.mpid
    };
  }

  static checkout({ user, cart, selectedUserAddress, selectedCard }) {
    return {
      toPg: {
        resPartnerId: user.id
      },
      toMp: {
        customer_id: user.mpid,
        items: cart.getMpFormattedItems(),
        shipping: selectedUserAddress.getMpFormattedShipping(),
        payments: [selectedCard.getMpFormattedPayment({})]
      }
    };
  }
}