import { BaseController, StateToApi, SocialMediaHelper, CepHelper } from './helpers';
import { User, Categories, Cards, Products, SaleOrders, UnitsOfMeasure, Cart, SubscriptionCart } from './entities';
import {
  UserRepository,
  UserAddressesRepository,
  CategoriesRepository,
  PaymentRepository,
  ProductsRepository,
  SaleOrdersRepository,
  StockRepository, 
  UnitsOfMeasureRepository,
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
    this.stockRepo = new StockRepository();
    this.uomRepo = new UnitsOfMeasureRepository();

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
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleUpdateSubscriptionCart = this.handleUpdateSubscriptionCart.bind(this);
  }

  async initialFetch() {
    const {
      setCategoriesAction,
      setPopularProductsAction,
      setNewProductsAction,
      setProductsAction,
      setUnitsOfMeasureAction
    } = this.getProps();
    
    const promises = [
      this.categoriesRepo.fetchCategories(),
      this.productsRepo.fetchPopularProducts(),
      this.productsRepo.fetchNewProducts(),
      this.stockRepo.getDailyStockLines(),
      this.productsRepo.fetchProducts(),
      this.uomRepo.fetchUnitsOfMeasure(),
    ];

    const [
      categoriesPromise,
      popularProductsPromise,
      newProductsPromise,
      stockPromise,
      productsPromise,
      uomPromise,
    ] = await Promise.all(promises);

    if(!productsPromise.err && !stockPromise.err) {
      const products = new Products(productsPromise.data, null, stockPromise.data);
      setProductsAction(products);
    }
    
    if(!uomPromise.err) {
      const uom = new UnitsOfMeasure(uomPromise.data);

      setUnitsOfMeasureAction(uom);
    }

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
      setSaleOrdersAction,
      setCepAction, 
    } = this.getProps();

    let pgUser = await this.userRepo.getUser(user.uid);

    if(pgUser.err) {
      pgUser = await this.userRepo.checkEmail({ fuid: user.uid, email: user.email });
      if(pgUser.err) pgUser = await this.userRepo.createUser(StateToApi.createUserFromGoogleSignIn(user));
    }

    if(!pgUser.err) {
      const { id } = pgUser.data;
      const children = await this.userRepo.getUserChildren(id);
      pgUser.data.children = children.data;
      
      const newUser = new User(pgUser.data);
      setUserAction(newUser);

      if(newUser.addresses && newUser.addresses.all.length) {
        const address = newUser.addresses.getDefaultUserAddress();
        selectUserAddressAction(address);
        const cep = await CepHelper.check(address.cep);
        setCepAction(cep);
      }
      
      if(newUser.mpid) {
        const userCards = await this.paymentRepo.listCards(newUser.mpid);
        if(!userCards.err) {
          const newCards = new Cards(userCards.data.data);
          setCardsAction(newCards);
          selectCardAction(newCards.getDefaultCard());
        }
      } else {
        const { name, cnpjCpf, email } = pgUser.data;
        this.userRepo.addMpid({ id, name, cnpjCpf, email })
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
    const {
      selectDateAction,
      selectedDate,
      cart,
      subscriptionCart,
      openCartWarningModalAction
    } = this.getProps();
    const selected = e.target.value;

    this.baseHandleSelectDate({
      selected,
      selectDateAction,
      selectedDate,
      cart,
      subscriptionCart,
      openCartWarningModalAction,
      Cart,
      SubscriptionCart
    });
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
      if(code === 'auth/invalid-email') toState.forgotPasswordError = 'E-mail inválido';
      if(code === 'auth/user-not-found') toState.forgotPasswordError = 'E-mail não está cadastrado';
    });

    this.toState(toState);
  }

  handleUpdateCart({ item, quantity }) {
    const { cart, updateCartAction, dateObj: { stockDate } } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity }, cart, updateCartAction, stockDate);
  }

  handleUpdateSubscriptionCart({ item, quantity, periodicity, secondaryPeriodicity }) {
    const { subscriptionCart, updateSubscriptionCartAction, dateObj: { stockDate } } = this.getProps();
    this.baseHandleUpdateCart({ item, quantity, periodicity, secondaryPeriodicity }, subscriptionCart, updateSubscriptionCartAction, stockDate);
  }
}