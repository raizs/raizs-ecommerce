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

  static completeSignupUser(values) {
    return {
      name: values.signupName,
      lastName: values.signupLastName,
      cnpjCpf: parseInt(Formatter.extractNumbers(values.signupCpf)),
      email: values.signupEmail,
      phone: Formatter.extractNumbers(values.signupCellphone),
      customer: true
    };
  }

  static createAddressCheckout(values) {
    return {
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
    }
  }

  static createCreditCard(values) {
    return {
      toMundipagg: {
        number: values.creditCardNumber,
        holder_name: values.creditCardName,
        exp_month: values.creditCardExp.split('/')[0],
        exp_year: values.creditCardExp.split('/')[1],
        cvv: values.creditCardCvv
      },
      shouldSaveCard: values.creditCardShouldSave,
      customer_id: values.mpid
    };
  }

  static checkout({ user, cart, selectedUserAddress, selectedCreditCard }) {
    return {
      toPg: {
        resPartnerId: user.id
      },
      toMp: {
        customer_id: user.mpid,
        items: cart.getMpFormattedItems(),
        shipping: selectedUserAddress.getMpFormattedShipping(),
        payments: [selectedCreditCard.getMpFormattedPayment({})]
      }
    };
  }
}