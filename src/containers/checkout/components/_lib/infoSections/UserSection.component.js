import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse } from '@material-ui/core';
import { Loading, FacebookButton, GoogleButton } from '../../../../../molecules';
import { Formatter } from '../../../../../helpers';

import { UserLoginForm, UserSignupForm } from '.';

const styles = theme => ({
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.green.main,
    borderTopRightRadius: theme.spacing.unit,
    borderTopLeftRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    userSelect: 'none',
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  number: {
    color: 'white',
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  label: {
    color: 'white',
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  content: {
    position: 'relative',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit
  },
  half: {
    width: '50%',
    display: 'inline-block',
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    verticalAlign: 'top'
  },
  facebookButton: theme.buttons.facebook,
  googleButton: theme.buttons.google,
  formTitle: theme.typography.formTitle,
  textWithLineBehind: {
    ...theme.typography.textWithLineBehind,
    fontSize: theme.fontSizes.XS,
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
  doneWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  doneNumber: {
    display: 'inline-block',
    color: theme.palette.green.main,
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.gray.bg
  },
  doneLabel: {
    display: 'inline-block',
    color: theme.palette.gray.main,
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  doneInfo: {
    color: theme.palette.gray.main,
    lineHeight: '1.375em'
  },
  doneChange: {
    color: theme.palette.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  continueAs: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 2 * theme.spacing.unit,
    '& > span': {
      textAlign: 'center',
      fontSize: theme.fontSizes.SM,
      color: theme.palette.green.main,
      fontWeight: 700,
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
});

class UserSection extends Component {

  static propTypes = {
    prop: PropTypes.object,
  }

  _renderCollapsibleContent() {
    const {
      user,
      errors,
      classes,
      userSectionLoading,
      handleChange,
      handleCheckbox,
      handleGoogleSignin,
      handleSignup,
      handleCompleteSignup,
      handleEmailAndPasswordLogin,
      handleOpenSection,
      loginEmailOrCellphone,
      loginPassword,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupNews,
      signupPassword
    } = this.props;

    const toSignupForm = {
      user,
      errors,
      handleChange,
      handleCheckbox,
      handleSignup,
      handleCompleteSignup,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupNews,
      signupPassword
    };

    return user && !user.isComplete ? (
      <div>
        { userSectionLoading && <Loading absolute /> }

        <div className={classes.whole}>
          <h3 className={classes.formTitle}>Complete seu cadastro</h3>
          <UserSignupForm {...toSignupForm} isCompleteForm />
        </div>
      </div>
    ) : (
      <div>
        { userSectionLoading && <Loading absolute /> }

        <div className={classes.half}>
          <h3 className={classes.formTitle}>Login</h3>
          <FacebookButton
            id='facebook-login'
            className={classes.facebookButton}
            clickAction={() => handleGoogleSignin(true)} />
          <GoogleButton
            id='google-login'
            className={classes.googleButton}
            clickAction={() => handleGoogleSignin(false)} />
          <div className={classes.textWithLineBehind}><span>ou entre com sua conta</span></div>
          <UserLoginForm
            errors={errors}
            loginEmailOrCellphone={loginEmailOrCellphone}
            loginPassword={loginPassword}
            handleChange={handleChange}
            handleSubmit={handleEmailAndPasswordLogin}
          />
        </div>

        <div className={classes.half}>
          <h3 className={classes.formTitle}>Cadastro</h3>
          <FacebookButton
            id='facebook-signup'
            className={classes.facebookButton}
            clickAction={() => handleGoogleSignin(true)} />
          <GoogleButton
            id='google-signup'
            className={classes.googleButton}
            clickAction={() => handleGoogleSignin(false)} />
          <div className={classes.textWithLineBehind}><span>ou cadastre-se com o email</span></div>
          <UserSignupForm {...toSignupForm} />
        </div>

        {
          user &&
          <div className={classes.continueAs} onClick={() => handleOpenSection('address')}>
            <span>continuar como {user.name}</span>
          </div>
        }
      </div>
    )
  }

  _renderCollapsible() {
    const { classes, openedSection } = this.props;
    const isOpen = openedSection === 'user';

    return (
      <div className={classes.section}>

        <div className={classes.title}>
          <div className={classes.number}>1</div>
          <h4 className={classes.label}>IDENTIFICAÇÃO</h4>
        </div>
        
        <Collapse in={isOpen}>
          <div className={classes.content}>
            {this._renderCollapsibleContent()}
          </div>
        </Collapse>
      </div>
    );
  }

  _renderDone() {
    const { classes, handleOpenSection } = this.props;
    return (
      <div className={classes.doneWrapper}>
        <div>
          <div className={classes.doneNumber}>1</div>
          <h4 className={classes.doneLabel}>IDENTIFICAÇÃO</h4>
        </div>
        {this._renderDoneInfo()}
        <div className={classes.doneChange} onClick={() => handleOpenSection('user')}>
          alterar
        </div>
      </div>
    );
  }

  _renderDoneInfo() {
    const { classes, user } = this.props;

    return user ? (
      <div>
        <div className={classes.doneInfo}>{user.name}</div>
        <div className={classes.doneInfo}>{Formatter.formatCpf(user.cpf)}</div>
        <div className={classes.doneInfo}>{user.email}</div>
        <div className={classes.doneInfo}>{Formatter.formatPhone(user.phone)}</div>
      </div>
    ) : null;
  }

  _renderSection() {
    const { isUserSectionDone } = this.props;

    if(isUserSectionDone) return this._renderDone();
    return this._renderCollapsible();
  }

  render() {
    return this._renderSection();
  }
}

UserSection = withStyles(styles)(UserSection);

export { UserSection };