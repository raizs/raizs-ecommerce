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
    cursor: 'pointer',
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
  }
});

class UserSection extends Component {
  state = {
    isOpen: false,
    isDone: false
  }

  static propTypes = {
    prop: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const prevIsOpen = this.props.isOpen, nextIsOpen = nextProps.isOpen;
    const prevIsDone = this.props.isDone, nextIsDone = nextProps.isDone;
    if(prevIsOpen !== nextIsOpen) this.setState({ isOpen: nextIsOpen });
    if(prevIsDone !== nextIsDone) this.setState({ isDone: nextIsDone });
  }

  _renderCollapsibleContent() {
    const {
      user,
      classes,
      userSectionLoading,
      handleChange,
      handleCheckbox,
      handleGoogleSignin,
      handleCompleteSignup,
      loginEmailOrCellphone,
      handleEmailAndPasswordLogin,
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
      handleChange,
      handleCheckbox,
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
            clickAction={() => console.log('sd')} />
          <GoogleButton
            id='google-login'
            className={classes.googleButton}
            clickAction={handleGoogleSignin} />
          <div className={classes.textWithLineBehind}><span>ou entre com sua conta</span></div>
          <UserLoginForm
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
            clickAction={() => console.log('sd')} />
          <GoogleButton
            id='google-signup'
            className={classes.googleButton}
            clickAction={handleGoogleSignin} />
          <div className={classes.textWithLineBehind}><span>ou cadastre-se com o email</span></div>
          <UserSignupForm {...toSignupForm} />
        </div>
      </div>
    )
  }

  _renderCollapsible() {
    const { classes } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={classes.section}>

        <div className={classes.title} onClick={() => this.setState({ isOpen: !isOpen })}>
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
    const { classes, user, handleOpenSection } = this.props;
    return (
      <div className={classes.doneWrapper}>
        <div>
          <div className={classes.doneNumber}>1</div>
          <h4 className={classes.doneLabel}>IDENTIFICAÇÃO</h4>
        </div>
        <div>
          <div className={classes.doneInfo}>{user.name}</div>
          <div className={classes.doneInfo}>{Formatter.formatCpf(user.cpf)}</div>
          <div className={classes.doneInfo}>{user.email}</div>
          <div className={classes.doneInfo}>{Formatter.formatPhone(user.phone)}</div>
        </div>
        <div className={classes.doneChange} onClick={() => handleOpenSection('user')}>
          alterar
        </div>
      </div>
    );
  }

  _renderSection() {
    const { isDone } = this.state;

    if(isDone) return this._renderDone();
    return this._renderCollapsible();
  }

  render() {
    return this._renderSection();
  }
}

UserSection = withStyles(styles)(UserSection);

export { UserSection };