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
}