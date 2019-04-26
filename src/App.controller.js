import { BaseController, StateToApi, SocialMediaHelper } from './helpers';
import { User, Categories, UserAddresses, CreditCards } from './entities';
import { UserRepository, UserAddressesRepository, CategoriesRepository, PaymentRepository } from './repositories';

export class AppController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.userAddressesRepo = new UserAddressesRepository();
    this.categoriesRepo = new CategoriesRepository();
    this.paymentRepo = new PaymentRepository();

    this.initialFetch = this.initialFetch.bind(this);
    this.fetchPgUser = this.fetchPgUser.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.logout = this.logout.bind(this);

    this.handleSelectDate = this.handleSelectDate.bind(this);

    // handles
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  async initialFetch() {
    const { setCategoriesAction } = this.getProps();
    
    const promises = [
      this.categoriesRepo.fetchCategories()
    ];

    const [
      categoriesPromise
    ] = await Promise.all(promises);

    if(!categoriesPromise.err) {
      const categories = new Categories(categoriesPromise.data);
      
      setCategoriesAction(categories);
    }
  }

  async fetchPgUser(user) {
    const {
      setUserAction,
      setUserAddressesAction,
      selectUserAddressAction,
      setCreditCardsAction,
      selectCreditCardAction,
    } = this.getProps();

    let pgUser = await this.userRepo.getUser(user.uid);

    
    // if(pgUser.err) pgUser = await this.userRepo.createUser(StateToApi.createUserFromGoogleSignIn(user));
    
    if(!pgUser.err) {
      const children = await this.userRepo.getUserChildren(pgUser.data.id);
      pgUser.data.children = children.data;
      
      const newUser = new User(pgUser.data);
      setUserAction(newUser);

      if(newUser.addresses && newUser.addresses.all.length) 
        selectUserAddressAction(newUser.addresses.getDefaultUserAddress());

      const userCreditCards = await this.paymentRepo.listCards(newUser.mpid);
      if(!userCreditCards.err) {
        const newCreditCards = new CreditCards(userCreditCards.data.data);
        setCreditCardsAction(newCreditCards);
        selectCreditCardAction(newCreditCards.getDefaultCreditCard());
      }
    } else {
      await setUserAction(new User({}));
      setUserAction(null);
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

  async signInWithGoogle() {
    const { firebase, setUserAction } = this.getProps();

    const { success, error, user, isNewUser } = SocialMediaHelper.signInWithGoogle(firebase);

    if(success && isNewUser) {
      const { createUser } = this.userRepo;
      const pgUser = await createUser(StateToApi.createUserFromGoogleSignIn(user));

      if(!pgUser.err) setUserAction(new User(pgUser.data));
    }

    if(error) {
      // handle error
    }
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

  handleSelectDate(e) {
    const { selectDateAction } = this.getProps();
    const { value } = e.target;

    selectDateAction(value);
  }
}