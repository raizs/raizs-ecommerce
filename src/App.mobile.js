import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { withCookies } from 'react-cookie';
import compose from 'recompose/compose';
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
  openCartWarningModalAction
} from './store/actions';

import { HeaderMobile, FooterMobile, CartWarningModal } from './components';
import { About } from './containers/about';
import { Cart } from './containers/cart';
import { Catalog } from './containers/catalog';
import { Checkout } from './containers/checkout';
import { Home } from './containers/home';
import { Home2 } from './containers/home2';
import { Home3 } from './containers/home3';
import { LandingMobile } from './containers/landing';
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

class BrowserApp extends BaseContainer {
  constructor(props) {
    super(props, AppController);
  
    this.state = {
      email: '',
      password: '',
      forgotPasswordEmail: '',
  
      loginLoading: false,
      emailError: '',
      passwordError: '',
      forgotPasswordError: ''
    };
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
  }

  _renderFooter(currentPath) {
    const { history } = this.props;

    return !['assinatura', 'carrinho', 'checkout'].includes(currentPath) && <FooterMobile history={history} />;
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
      <div className='App' style={{ backgroundColor: '#EFEFEF' }}>
        {showFixedLoading && <Loading fixed />}
        {/* <ProductModal />
        <CartWarningModal />
        <ConfirmationModal />
        <ToastContainer
          autoClose={5000}
          toastClassName='raizs-toast'
          progressClassName='raizs-toast-progress'
        /> */}
        <HeaderMobile history={history} />
        <div onClick={() => searching ? this.props.toggleSearchBarAction(false) : null}>
          <Switch>
            <Route path='/' exact component={LandingMobile} />
            {/* <Route path='/home' exact component={Home} />
            <Route path='/home2' exact component={Home2} />
            <Route path='/home3' exact component={Home3} />
            <Route path='/catalogo' exact component={Catalog} />
            <Route path='/carrinho' exact component={Cart} />
            <Route path='/checkout' exact component={Checkout} />
            <Route path='/quem-somos' exact component={About} />
            <Route path='/pedido-finalizado' exact component={OrderCompleted} />
            <Route path='/painel' component={Dashboard} />
            <Route path='/assinatura' component={Subscription} />
            <Route path='/:seoDescription/p' component={Product} />
            <Route path='/como-funciona' component={HowItWorks} />
            <Route path='/familias' component={Families} />
            <Route path='/ajuda' component={HelpCenter} /> */}
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
        {this._renderFooter(currentPath)}
      </div>
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
)(BrowserApp);
