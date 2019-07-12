import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withFirebase } from 'react-redux-firebase';
import { ToastContainer, toast } from 'react-toastify';
import { CookiesProvider, withCookies } from 'react-cookie';
import compose from 'recompose/compose';
import SmoothScroll from 'smooth-scroll';

import 'img-2';
import './styles/css/index.css';
import 'moment/locale/pt-br.js';
import 'react-toastify/dist/ReactToastify.css';

import {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setCategoriesAction,
  setUserAddressesAction,
  selectUserAddressAction,
  setCardsAction,
  selectCardAction,
  selectDateAction,
  setPopularProductsAction,
  setSaleOrdersAction,
  setNewProductsAction,
  toggleSearchBarAction,
  setCepAction,
  updateCartAction,
  updateSubscriptionCartAction,
  setProductsAction,
  setUnitsOfMeasureAction,
  openCartWarningModalAction, 
  showConfirmationModalAction
} from './store/actions';

import defaultTheme from './muiTheme';

import { Header, TopHeader, Footer, BottomHeader, CartWarningModal } from './components';
import { About } from './containers/about';
import { Cart } from './containers/cart';
import { Catalog } from './containers/catalog';
import { Checkout } from './containers/checkout';
import { Home } from './containers/home';
import { Home2 } from './containers/home2';
import { Home3 } from './containers/home3';
import { Landing } from './containers/landing';
import { OrderCompleted } from './containers/orderCompleted';
import { NotFound } from './containers/notFound';
import { HowItWorks } from './containers/howItWorks';
import { Dashboard } from './containers/dashboard';
import { Product } from './containers/product';
import { HelpCenter } from './containers/helpCenter';
import { BaseContainer, CartHelper } from './helpers';
import { Subscription } from './containers/subscription';
import { AppController } from './App.controller';
import { Families } from './containers/families';
import ProductModal from './containers/product/ProductModal.container'
import { ConfirmationModal } from './containers/confirmationModal'
import { Loading } from './molecules';

const actions = {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setUserAddressesAction,
  setCategoriesAction,
  selectUserAddressAction,
  setCardsAction,
  selectCardAction,
  selectDateAction,
  setPopularProductsAction,
  setSaleOrdersAction,
  setNewProductsAction,
  toggleSearchBarAction,
  setCepAction,
  updateCartAction,
  updateSubscriptionCartAction,
  setProductsAction,
  setUnitsOfMeasureAction,
  openCartWarningModalAction
};

class App extends BaseContainer {
  constructor(props) {
    super(props, AppController);
  }

  state = {
    email: '',
    password: '',
    forgotPasswordEmail: '',

    loginLoading: false,
    emailError: '',
    passwordError: '',
    forgotPasswordError: ''
  }

  async componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.controller.fetchPgUser(user);
        toast(`Bem vindo(a), ${user.displayName}!`, { autoClose: 3500, position: toast.POSITION.BOTTOM_RIGHT });
      }
      else {
        this.props.setUserAction(null);
        this.props.setUserAddressesAction(null);
        this.props.selectUserAddressAction(null);
        this.props.setCardsAction(null);
        this.props.selectCardAction(null);
        this.props.setCepAction(null);
      }
    });

    this.controller.initialFetch();

    // new SmoothScroll('a[href^="#"]', {
    //   speed: 750,
    //   speedAsDuration: true
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { cart, cookies, updateCartAction } = this.props;
    const { products } = nextProps;
    const cookieCart = cookies.get('cart');
    
    if(cookieCart && !cart.productCount && products && products.all.length) {
      const newCart = CartHelper.createCartFromCookie({ cookieCart, products });
      updateCartAction(newCart);
    }
  }

  _renderTopHeader(currentPath) {
    const { history, selectedDate } = this.props;
    const { handleSelectDate } = this.controller;

    return !['assinatura', 'carrinho', 'checkout'].includes(currentPath) && (
      <TopHeader history={history} handleSelectDate={handleSelectDate} selectedDate={selectedDate} />
    );
  }

  _renderBottomHeader(currentPath) {
    const { selectedDate } = this.props;
    const { handleSelectDate } = this.controller;

    return ['assinatura'].includes(currentPath) && (
      <BottomHeader handleSelectDate={handleSelectDate} selectedDate={selectedDate} />
    );
  }

  _renderFooter(currentPath) {
    const { history } = this.props;

    return !['assinatura', 'carrinho', 'checkout'].includes(currentPath) && <Footer history={history} />;
  }

	render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      forgotPasswordEmail,
      forgotPasswordError,
      loginLoading
    } = this.state;
    const {
      history,
      storeFirebase,
      isUserPopperOpen,
      searching,
      categories,
      showFixedLoading
    } = this.props;
    const {
      logout,
      handleTextInputChange,
      signInWithEmailAndPassword,
      signInWithGoogle,
      signInWithFacebook,
      handleSubmitForgotPassword,
      handleSelectDate,
      handleUpdateCart,
      handleUpdateSubscriptionCart
    } = this.controller;

    const isAuth = !storeFirebase.auth.isEmpty;
    const currentPath = this.props.location.pathname.split('/')[1];
    const isSubscription = currentPath === 'assinatura';

    const headerProps = {
      isAuth,
      history,
      isUserPopperOpen,
      isSubscription,
      categories,
      currentPath,
      handleSelectDate,
      handleUpdateCart,
      handleUpdateSubscriptionCart,
      toForm: {
        email,
        emailError,
        password,
        passwordError,
        forgotPasswordEmail,
        forgotPasswordError,
        handleChange: handleTextInputChange,
        handleSubmit: signInWithEmailAndPassword,
        handleSubmitForgotPassword: handleSubmitForgotPassword,
        handleGoogleSignIn: signInWithGoogle,
        handleFacebookSignIn: signInWithFacebook,
        loginLoading
      },
      toLoggedIn: {
        general: () => history.push('/painel/geral'),
        profile: () => history.push('/painel/perfil'),
        subscriptions: () => history.push('/painel/assinaturas'),
        orders: () => history.push('/painel/pedidos'),
        logout
      }
    };

		return (
      <MuiThemeProvider theme={defaultTheme}>
        <CookiesProvider>
          <div className='App' style={{ backgroundColor: '#EFEFEF' }}>
            {showFixedLoading && <Loading fixed />}
            <ProductModal />
            <CartWarningModal />
            <ConfirmationModal />
            <ToastContainer
              autoClose={5000}
              toastClassName='raizs-toast'
              progressClassName='raizs-toast-progress'
            />
            {this._renderTopHeader(currentPath)}
            <Header {...headerProps} />
            {this._renderBottomHeader(currentPath)}
            <div onClick={() => searching ? this.props.toggleSearchBarAction(false) : null}>
              <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/home' exact component={Home} />
                <Route path='/home2' exact component={Home2} />
                <Route path='/home3' exact component={Home3} />
                <Route path='/catalogo' exact component={Catalog} />
                <Route path='/carrinho' exact component={Cart} />
                <Route path='/checkout' exact component={Checkout} />
                <Route path='/quem-somos' exact component={About} />
                <Route path='/pedido-finalizado' exact component={OrderCompleted} />
                <Route path='/painel' component={Dashboard} />
                <Route path='/assinatura' component={Subscription} />
                <Route path='/produto/:productId' component={Product} />
                <Route path='/como-funciona' component={HowItWorks} />
                <Route path='/familias' component={Families} />
                <Route path='/ajuda' component={HelpCenter} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
            {this._renderFooter(currentPath)}
          </div>
        </CookiesProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  storeFirebase: state.firebase,
  categories: state.categories.model,
  isUserPopperOpen: state.header.isUserPopperOpen,
  user: state.user.current,
  searching: state.header.isSearchBarOpen,
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart.current,
  selectedDate: state.datePicker.selected,
  dateObj: state.datePicker.obj,
  products: state.products.model,
  showFixedLoading: state.loading.showFixed
});

export default compose(
  withCookies,
  withRouter,
  withFirebase,
	connect(
		mapStateToProps,
		actions
  )
)(App);
