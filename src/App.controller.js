import { BaseController, StateToApi } from './helpers';
import { User, Categories } from './entities';
import { UserRepository, CategoriesRepository } from './repositories';

export class AppController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.categoriesRepo = new CategoriesRepository();

    this.initialFetch = this.initialFetch.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.logout = this.logout.bind(this);

    // handles
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  async initialFetch() {
    const { setCategoriesAction } = this.getProps();
    const promises = [
      this.categoriesRepo.fetchCategories()
    ];

    console.time('fetch')
    const [
      categoriesPromise
    ] = await Promise.all(promises);
    console.timeEnd('fetch')

    if(!categoriesPromise.err) {
      const categories = new Categories(categoriesPromise.data);
      
      setCategoriesAction(categories);
    }
  }

  signInWithEmailAndPassword() {
    const { email, password } = this.getState();
    const { firebase, closeUserPopperAction, openUserPopperAction } = this.getProps();

    closeUserPopperAction();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('success');
    })
    .catch(error => {
      openUserPopperAction();
      console.log(error);
    });
  }

  signInWithGoogle() {
    const { firebase, setUserAction } = this.getProps();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(async response => {
      const { user, additionalUserInfo } = response;
      const { createUser } = this.userRepo;
      
      if(additionalUserInfo.isNewUser) {
        const pgUser = await createUser(StateToApi.createUserFromGoogleSignIn(user));

        console.log(pgUser);

        if(!pgUser.err) setUserAction(new User(pgUser.data));
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log('error', {errorCode, errorMessage, email, credential});
    });
  }
    
  logout() {
    const { firebase, closeUserPopperAction } = this.getProps();
    closeUserPopperAction()
    firebase.auth().signOut();
  }

  handleTextInputChange(e) {
    const { id, value } = e.target;
    this.toState({ [id]: value });
  }
}