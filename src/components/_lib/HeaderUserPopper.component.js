import React, { Component } from 'react'

import { withStyles } from '@material-ui/core';
import { loggedUserMenuOptions } from '../../assets';
import { FacebookButton, GoogleButton, TextInput } from '../../molecules';

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
    ...theme.inputs.textSmall,
    marginTop: 2 * theme.spacing.unit
  },
  forgotPassword: {
    fontSize: theme.fontSizes.XS,
    color: theme.palette.gray.main,
    textAlign: 'center',
    fontWeight: 600,
    marginTop: theme.spacing.unit,
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
    },
    '&:disabled': {
      backgroundColor: theme.palette.gray.main,
      cursor: 'not-allowed'
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

class HeaderUserPopper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forgotPassword: false
    }
  }
  
  _renderLoggedInPopper = (classes, toLoggedIn) => {
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
  
  _renderLoggedOutPopper = (classes, toForm) => {
    const {
      email,
      password,
      handleChange,
      handleSubmit,
      handleSubmitForgotPassword,
      forgotPasswordError,
      passwordError,
      emailError,
      handleGoogleSignIn,
      handleFacebookSignIn,
      forgotPasswordEmail,
      loginLoading
    } = toForm;
    const { forgotPassword } = this.state;

    return (
      <div className={classes.wrapper}>
        <FacebookButton
          id='facebook-login'
          className={classes.facebookButton}
          clickAction={handleFacebookSignIn} />
        <GoogleButton
          id='google-login'
          className={classes.googleButton}
          clickAction={handleGoogleSignIn} />
        {
          forgotPassword ? (
            <form onSubmit={e => { e.preventDefault(); handleSubmitForgotPassword(); }} className={classes.form}>
              <TextInput
                id='forgotPasswordEmail'
                value={forgotPasswordEmail}
                handleChange={handleChange}
                placeholder='Digite seu e-mail'
                className={classes.textInput}
                error={forgotPasswordError}
                disabled={loginLoading}
              />
              <p className={classes.forgotPassword} onClick={() => this.setState({ forgotPassword: false })}>
                Voltar
              </p>
              <button disabled={loginLoading} type='submit' className={classes.loginButton}>Enviar</button>
            </form>
          ) : (
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={classes.form}>
              <TextInput
                id='email'
                value={email}
                handleChange={handleChange}
                placeholder='E-mail'
                className={classes.textInput}
                disabled={loginLoading}
                error={emailError}
              />
              <TextInput
                id='password'
                value={password}
                handleChange={handleChange}
                type='password'
                placeholder='Senha'
                className={classes.textInput}
                disabled={loginLoading}
                error={passwordError}
              />
              <p className={classes.forgotPassword} onClick={() => this.setState({ forgotPassword: true })}>Esqueceu sua senha?</p>
              <button disabled={loginLoading} type='submit' className={classes.loginButton}>Login</button>
            </form>
          )
        }
        <p className={classes.infoText}>Não possui uma conta?</p>
        <p className={classes.register}>Cadastre-se</p>
      </div>
    );
  };


  render() {
    const { classes, isAuth, toForm, toLoggedIn } = this.props;
  
    return isAuth ? this._renderLoggedInPopper(classes, toLoggedIn) : this._renderLoggedOutPopper(classes, toForm);
  }
}

HeaderUserPopper = withStyles(styles)(HeaderUserPopper);

export { HeaderUserPopper };