import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';

import cep from 'cep-promise';

import './styles/css/index.css';

import {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setCategoriesAction,
  setProductsAction
} from './store/actions';
// import { Private } from './containers/private';

import defaultTheme from './muiTheme';

import { Header, TopHeader, Footer } from './components';
import { About } from './containers/about';
import { BaseContainer } from './helpers';
import { AppController } from './App.controller';

const actions = {
  closeUserPopperAction,
  openUserPopperAction,
  setUserAction,
  setCategoriesAction,
  setProductsAction
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
      if(user) console.log(`welcome ${user.displayName}`);
    });

    this.controller.initialFetch();

    window.cepPromise = cep;
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
