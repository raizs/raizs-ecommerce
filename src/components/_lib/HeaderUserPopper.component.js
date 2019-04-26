import React from 'react'

import { withStyles } from '@material-ui/core';
import { loggedUserMenuOptions } from '../../assets';
import { FacebookButton, GoogleButton } from '../../molecules';

const styles = theme => ({
  wrapper: {
    maxWidth: '240px'
  },
  menuItem: {
    marginBottom: 2 * theme.spacing.unit,
    fontSize: theme.fontSizes.MD,
    color: theme.palette.gray.main,
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 700
    },
    '&:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 700,
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden'
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  top: {
    '& > *': {
      display: 'inline-block',
      marginBottom: 2 * theme.spacing.unit
    }
  },
  facebookButton: theme.buttons.facebook,
  googleButton: theme.buttons.google,
  textInput: {
    ...theme.inputs.text,
    ...theme.inputs.small,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    '&:focus': {
      marginLeft: 0,
      marginRight: 0,
    }
  },
  forgotPassword: {
    fontSize: theme.fontSizes.XS,
    color: theme.palette.gray.main,
    textAlign: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  loginButton: {
    ...theme.buttons.primary,
    width: '100%',
    marginTop: 2 * theme.spacing.unit,
    '&:active': {
      boxShadow: '1px 1px 2px 0 #444'
    }
  },
  infoText: {
    ...theme.typography.infoText,
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  register: {
    textAlign: 'center',
    color: theme.palette.green.main,
    textDecoration: 'underline',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM
  }
});

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
      <FacebookButton
        id='facebook-login'
        className={classes.facebookButton}
        clickAction={() => console.log('fb login')} />
      <GoogleButton
        id='google-login'
        className={classes.googleButton}
        clickAction={handleGoogleSignIn} />
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