import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';
import SmoothScroll from 'smooth-scroll';

import 'img-2';
import './styles/css/index.css';
import 'moment/locale/pt-br.js';

import {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setCategoriesAction,
  setUserAddressesAction
} from './store/actions';

import defaultTheme from './muiTheme';

import { Header, TopHeader, Footer } from './components';
import { About } from './containers/about';
import { Cart } from './containers/cart';
import { Catalog } from './containers/catalog';
import { Checkout } from './containers/checkout';
import { BaseContainer } from './helpers';
import { AppController } from './App.controller';

const actions = {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setUserAddressesAction,
  setCategoriesAction
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
      else this.props.setUserAction(null);
    });

    this.controller.initialFetch();

    const scroll = new SmoothScroll('a[href^="#"]', {
      speed: 750,
      speedAsDuration: true
    });
  }

	render() {
    const { email, password } = this.state;
    const { history, storeFirebase, isUserPopperOpen } = this.props;
    const {
      logout,
      handleTextInputChange,
      signInWithEmailAndPassword,
      signInWithGoogle
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
        <div className="App">
          <TopHeader history={history} />
          <Header {...headerProps} />
          <Switch>
            <Route path="/catalogo" exact component={Catalog} />
            <Route path="/carrinho" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/quem-somos" exact component={About} />
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
    user: state.user.current
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
