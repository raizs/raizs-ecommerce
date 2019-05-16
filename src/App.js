import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withFirebase } from 'react-redux-firebase';
import { ToastContainer } from 'react-toastify';
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
  setSaleOrdersAction
} from './store/actions';

import defaultTheme from './muiTheme';

import { Header, TopHeader, Footer } from './components';
import { About } from './containers/about';
import { Cart } from './containers/cart';
import { Catalog } from './containers/catalog';
import { Checkout } from './containers/checkout';
import { Home } from './containers/home';
import { Home2 } from './containers/home2';
import { Landing } from './containers/landing';
import { OrderCompleted } from './containers/orderCompleted';
import { NotFound } from './containers/notFound';
import { Dashboard } from './containers/dashboard';
import { BaseContainer } from './helpers';
import { AppController } from './App.controller';

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
  setSaleOrdersAction
};

class App extends BaseContainer {
  constructor(props) {
    super(props, AppController);
  }

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if(user) this.controller.fetchPgUser(user);
      else {
        this.props.setUserAction(null);
        this.props.setUserAddressesAction(null);
        this.props.selectUserAddressAction(null);
        this.props.setCardsAction(null);
        this.props.selectCardAction(null);
      }
    });

    this.controller.initialFetch();

    new SmoothScroll('a[href^="#"]', {
      speed: 750,
      speedAsDuration: true
    });
  }

	render() {
    const { email, password } = this.state;
    const { history, storeFirebase, isUserPopperOpen, selectedDate } = this.props;
    const {
      logout,
      handleTextInputChange,
      signInWithEmailAndPassword,
      signInWithGoogle,
      handleSelectDate
    } = this.controller;

    const isAuth = !storeFirebase.auth.isEmpty;

    const headerProps = {
      isAuth,
      history,
      isUserPopperOpen,
      toForm: {
        email,
        password,
        handleChange: handleTextInputChange,
        handleSubmit: signInWithEmailAndPassword,
        handleGoogleSignIn: signInWithGoogle 
      },
      toLoggedIn: {
        logout
      }
    };

		return (
      <MuiThemeProvider theme={defaultTheme}>
        <div className='App'>
          <ToastContainer
            autoClose={5000}
            toastClassName='raizs-toast'
            progressClassName='raizs-toast-progress'
          />
          <TopHeader
            history={history}
            handleSelectDate={handleSelectDate}
            selectedDate={selectedDate}
          />
          <Header {...headerProps} />
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/home' exact component={Home} />
            <Route path='/home2' exact component={Home2} />
            <Route path='/catalogo' exact component={Catalog} />
            <Route path='/carrinho' exact component={Cart} />
            <Route path='/checkout' exact component={Checkout} />
            <Route path='/quem-somos' exact component={About} />
            <Route path='/pedido-finalizado' exact component={OrderCompleted} />
            <Route path='/painel' component={Dashboard} />
            <Route path='*' component={NotFound} />

          </Switch>
          <Footer history={history} />
        </div>
      </MuiThemeProvider>
		);
	}
}

const mapStateToProps = state => {
  return {
    storeFirebase: state.firebase,
    categories: state.categories.model,
    isUserPopperOpen: state.header.isUserPopperOpen,
    user: state.user.current,
    selectedDate: state.datePicker.selected
  };
}

export default compose(
  withRouter,
  withFirebase,
	connect(
		mapStateToProps,
		actions
  )
)(App);
