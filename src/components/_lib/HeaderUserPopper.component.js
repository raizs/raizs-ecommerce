import React from 'react'
import ReactSvg from 'react-svg';

import styles from './styles/headerUserPopper.styles';
import { withStyles, Button } from '@material-ui/core';
import { loggedUserMenuOptions } from '../../assets';

const _renderLoggedInPopper = (classes) => {
  return loggedUserMenuOptions.map(option => (
    <div
      key={option.id}
      title={option.label}
      className={classes.menuItem}
      onClick={() => console.log(option.id)}
    >
      {option.label}
    </div>
  ))
};

const _renderLoggedOutPopper = (classes) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <div className={classes.facebookButton}>
          <img src='/icons/facebook.jpg' />
          <p>
            Facebook
          </p>
        </div>
        <div className={classes.googleButton}>
          <img src='/icons/google-plus.png' />
          <p>
            Google
          </p>
        </div>
      </div>
      <form onSubmit={e => e.preventDefault()} className={classes.form}>
        <input className={classes.textInput} id='EMAIL' placeholder='E-mail' />
        <input type='password' className={classes.textInput} id='PASSWORD' placeholder='Senha' />
        <p className={classes.forgotPassword}>Esqueceu sua senha?</p>
        <button className={classes.loginButton}>Login</button>
      </form>
      <p className={classes.infoText}>Não possui uma conta?</p>
      <p className={classes.register}>Cadastre-se</p>
    </div>
  );
};

let HeaderUserPopper = props => {
  const { classes, isAuth } = props;

  return isAuth ? _renderLoggedInPopper(classes) : _renderLoggedOutPopper(classes);
}

HeaderUserPopper = withStyles(styles)(HeaderUserPopper);

export { HeaderUserPopper };