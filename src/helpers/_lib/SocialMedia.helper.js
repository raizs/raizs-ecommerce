export class SocialMediaHelper {
  static async signInWithGoogle(firebase) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = { success: false, error: null, user: null, isNewUser: false };

    await firebase.auth().signInWithPopup(provider).then(async res => {
      const { user, additionalUserInfo: { isNewUser } } = res;

      response.success = true;
      response.user = user;
      response.isNewUser = isNewUser

    }).catch(function(error) {
      console.warn('google signin error:\n', error);
      response.error = error;
    });

    return response;
  }

  static async signInWithEmailAndPassword(firebase, email, password) {
    const response = { success: false, error: null, user: null };

    await firebase.auth().signInWithEmailAndPassword(email, password).then(async res => {
      const { user } = res;
      response.success = true;
      response.user = user;
    }).catch(function(error) {
      console.warn('firebase email and password signin error:\n', error);
      response.error = error;
    });

    return response;
  }

  static async signInWithFacebook(firebase) {
    const provider = new firebase.auth.FacebookAuthProvider();
    const response = { success: false, error: null, user: null, isNewUser: false };

    await firebase.auth().signInWithPopup(provider).then(async res => {
      const { user, additionalUserInfo: { isNewUser } } = res;

      response.success = true;
      response.user = user;
      response.isNewUser = isNewUser
      
    }).catch(function(error) {
      console.warn('google signin error:\n', error);
      response.error = error;
    });

    return response;
  }
}