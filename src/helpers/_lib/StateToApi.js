import { Formatter } from "./Formatter";
import { Transaction } from "../../entities";

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

  static updateUserData(values) {
    return {
      name: values.name,
      lastName: values.lastName,
      phone: Formatter.extractNumbers(values.phone),
      cnpjCpf: parseInt(Formatter.extractNumbers(values.cpf))
     }
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


  static manageAddress(values) {
    return {
      addressName: values.name,
      name:values.name,
      receiverName: values.receiverName,
      zip: values.cep,
      street: values.street,
      number: values.number,
      street2: values.complement,
      district: values.neighbourhood,
      city: values.city,
      parentId: values.parentId,
      state: values.state,
      addressIsDefault: false
    };
  }

  static createAddressCheckout(values) {
    return {
      addressName: values.addressName,
      receiverName: values.addressReceiverName,
      zip: values.addressCep,
      street: values.addressAddress,
      number: values.addressNumber,
      street2: values.addressComplement,
      district: values.addressNeighbourhood,
      city: values.addressCity,
      state: values.addressState,
      addressIsDefault: false,
      name: values.addressReceiverName,
      parentId: values.parentId
    };
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

  static checkout({ user, cart, selectedUserAddress, selectedCard, momentDate, coupon, subcart, giftCard }) {
    let amount = 0;
    const transaction = new Transaction({ cart, subcart, coupon, giftCard });
    return {
      toPg: {
        resPartnerId: user.id,
        date:momentDate.format("YYYY-MM-DD"),
        address: selectedUserAddress,
        coupon,
        transaction,
      },
      toMp: {
        customer_id: user.mpid,
        items: cart.getMpFormattedItems(),
        shipping: selectedUserAddress.getMpFormattedShipping(),
        payments: [selectedCard.getMpFormattedPayment({ amount })]
      }
    };
  }
}