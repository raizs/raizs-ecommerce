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
      phone: Formatter.extractNumbers(values.signupCellphone)
    }
  }

  static createAddressCheckout(values) {
    return {
      resPartnerId: values.resPartnerId,
      name: values.addressName,
      receiverName: values.addressReceiverName,
      cep: values.addressCep,
      address: values.addressAddress,
      number: values.addressNumber,
      complement: values.addressComplement,
      neighbourhood: values.addressNeighbourhood,
      city: values.addressCity,
      state: values.addressState,
      isDefaultAddress: values.addressIsDefault
    }
  }
}