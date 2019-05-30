import { BaseController, StateToApi, SocialMediaHelper } from './helpers';
import { User, Categories, Cards, Products, SaleOrders } from './entities';
import {
  UserRepository,
  UserAddressesRepository,
  CategoriesRepository,
  PaymentRepository,
  ProductsRepository,
  SaleOrdersRepository,
} from './repositories';
import { toast } from 'react-toastify';

export class AppController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.userAddressesRepo = new UserAddressesRepository();
    this.categoriesRepo = new CategoriesRepository();
    this.productsRepo = new ProductsRepository();
    this.paymentRepo = new PaymentRepository();
    this.saleOrdersRepo = new SaleOrdersRepository();

    this.initialFetch = this.initialFetch.bind(this);
    this.fetchPgUser = this.fetchPgUser.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
    this.handleSubmitForgotPassword = this.handleSubmitForgotPassword.bind(this);
    this.logout = this.logout.bind(this);
    
    // handles
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  async initialFetch() {
    const { setCategoriesAction, setPopularProductsAction, setNewProductsAction } = this.getProps();
    
    const promises = [
      this.categoriesRepo.fetchCategories(),
      this.productsRepo.fetchPopularProducts(),
      this.productsRepo.fetchNewProducts(),
    ];

    const [
      categoriesPromise,
      popularProductsPromise,
      newProductsPromise
    ] = await Promise.all(promises);

    if(!categoriesPromise.err) {
      const categories = new Categories(categoriesPromise.data);
      
      setCategoriesAction(categories);
    }

    if(!popularProductsPromise.err) {
      const popularProducts = new Products(popularProductsPromise.data, 'popularProducts');

      setPopularProductsAction(popularProducts);
    }

    if(!newProductsPromise.err) {
      const newProducts = new Products(newProductsPromise.data, 'newProducts');

      setNewProductsAction(newProducts);
    }
  }

  async fetchPgUser(user) {
    const {
      setUserAction,
      selectUserAddressAction,
      setCardsAction,
      selectCardAction,
      setSaleOrdersAction
    } = this.getProps();

    let pgUser = await this.userRepo.getUser(user.uid);

    if(pgUser.err) pgUser = await this.userRepo.createUser(StateToApi.createUserFromGoogleSignIn(user));

    if(!pgUser.err) {
      const children = await this.userRepo.getUserChildren(pgUser.data.id);
      pgUser.data.children = children.data;
      
      const newUser = new User(pgUser.data);
      setUserAction(newUser);

      if(newUser.addresses && newUser.addresses.all.length) 
        selectUserAddressAction(newUser.addresses.getDefaultUserAddress());

      const userCards = await this.paymentRepo.listCards(newUser.mpid);
      if(!userCards.err) {
        const newCards = new Cards(userCards.data.data);
        setCardsAction(newCards);
        selectCardAction(newCards.getDefaultCard());
      }

      const ordersPromise = await this.saleOrdersRepo.getOrders(pgUser.data.id)
      if(!ordersPromise.err) {
        const saleOrders = new SaleOrders(ordersPromise.data)
        setSaleOrdersAction(saleOrders)
      }
    } else {
      await setUserAction(new User({}));
      setUserAction(null);
    }
  }

  async signInWithEmailAndPassword() {
    const { email, password } = this.getState();
    const { firebase, closeUserPopperAction, openUserPopperAction } = this.getProps();

    this.toState({ loginLoading: true });
    const toState = { loginLoading: false };
    closeUserPopperAction();
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => ({}))
    .catch(({ code }) => {
      openUserPopperAction();
      if(code === 'auth/invalid-email') toState.emailError = 'E-mail inválido';
      if(code === 'auth/user-not-found') toState.emailError = 'E-mail não está cadastrado';
      if(code === 'auth/wrong-password') toState.passwordError = 'Senha incorreta';
    });
    this.toState(toState);
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

  async signInWithFacebook() {
    const { firebase, setUserAction } = this.getProps();

    const { success, error, user, isNewUser } = SocialMediaHelper.signInWithFacebook(firebase);

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
    const toState = { [id]: value };
    if(id === 'email') toState.emailError = '';
    if(id === 'password') toState.passwordError = '';
    if(id === 'forgotPasswordEmail') toState.forgotPasswordError = '';
    this.toState(toState);
  }

  handleSelectDate(e) {
    const { selectDateAction } = this.getProps();
    const { value } = e.target;

    selectDateAction(value);
  }

  async handleSubmitForgotPassword() {
    const { forgotPasswordEmail } = this.getState();
    const { firebase } = this.getProps();
    const auth = firebase.auth();
    
    this.toState({ loginLoading: true });

    const toState = { loginLoading: false };
    await auth.sendPasswordResetEmail(forgotPasswordEmail).then(() => {
      toast(`E-mail enviado para ${forgotPasswordEmail}`);
      toState.forgotPasswordEmail = '';
    }).catch(({ code }) => {
      console.log('aqui', code)
      if(code === 'auth/invalid-email') toState.forgotPasswordError = 'E-mail inválido';
      if(code === 'auth/user-not-found') toState.forgotPasswordError = 'E-mail não está cadastrado';
    });

    this.toState(toState);
  }
}