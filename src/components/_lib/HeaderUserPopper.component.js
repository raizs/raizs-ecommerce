import React from 'react'

import styles from './styles/headerUserPopper.styles';
import { withStyles } from '@material-ui/core';
import { loggedUserMenuOptions } from '../../assets';

const _renderLoggedInPopper = (classes, toLoggedIn) => {
  return loggedUserMenuOptions.map(option => (
    <div
      key={option.id}
      title={option.label}
      className={classes.menuItem}
      onClick={toLoggedIn[option.id]}
    >
      {option.label}
    </div>
  ))
};

const _renderLoggedOutPopper = (classes, toForm) => {
  const { email, password, handleChange, handleSubmit, handleGoogleSignIn } = toForm;
  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <div className={classes.facebookButton}>
          <img alt='facebook login button' src='/icons/facebook.jpg' />
          <p>
            Facebook
          </p>
        </div>
        <div onClick={handleGoogleSignIn} className={classes.googleButton}>
          <img alt='google plus login button' src='/icons/google-plus.png' />
          <p>
            Google
          </p>
        </div>
      </div>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={classes.form}>
        <input
          id='email'
          value={email}
          onChange={handleChange}
          placeholder='E-mail'
          className={classes.textInput}
        />
        <input
          id='password'
          value={password}
          onChange={handleChange}
          type='password'
          placeholder='Senha'
          className={classes.textInput}
        />
        <p className={classes.forgotPassword}>Esqueceu sua senha?</p>
        <button type='submit' className={classes.loginButton}>Login</button>
      </form>
      <p className={classes.infoText}>Não possui uma conta?</p>
      <p className={classes.register}>Cadastre-se</p>
    </div>
  );
};

let HeaderUserPopper = props => {
  const { classes, isAuth, toForm, toLoggedIn } = props;

  return isAuth ? _renderLoggedInPopper(classes, toLoggedIn) : _renderLoggedOutPopper(classes, toForm);
}

HeaderUserPopper = withStyles(styles)(HeaderUserPopper);

export { HeaderUserPopper };