import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse } from '@material-ui/core';

import { UserLoginForm, UserSignupForm } from '.';

const styles = theme => ({
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.green.main,
    borderTopRightRadius: theme.spacing.unit,
    borderTopLeftRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    cursor: 'pointer',
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
    paddingTop: 3 * theme.spacing.unit,
    paddingBottom: 3 * theme.spacing.unit
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
  }
});

class UserSection extends Component {
  state = {
    isOpen: true,
    isDone: false
  }

  static propTypes = {
    prop: PropTypes.object,
  }

  _renderCollapsible() {
    const {
      classes,
      handleChange,
      handleCheckbox,
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
    const { isOpen } = this.state;

    const toSignupForm = {
      handleChange,
      handleCheckbox,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupNews,
      signupPassword
    };

    return (
      <div className={classes.section}>

        <div className={classes.title} onClick={() => this.setState({ isOpen: !isOpen })}>
          <div className={classes.number}>1</div>
          <h4 className={classes.label}>IDENTIFICAÇÃO</h4>
        </div>
        
        <Collapse in={isOpen}>
          <div className={classes.content}>

            <div className={classes.half}>
              <h3 className={classes.formTitle}>Login</h3>
              <div className={classes.facebookButton}>
                <img alt='facebook login button' src='/icons/facebook.jpg' />
                <p>
                  Facebook
                </p>
              </div>
              <div className={classes.googleButton}>
                <img alt='google plus login button' src='/icons/google-plus.png' />
                <p>
                  Google
                </p>
              </div>

              <div className={classes.textWithLineBehind}><span>ou entre com sua conta</span></div>

              <UserLoginForm
                emailOrCellphone={loginEmailOrCellphone}
                password={loginPassword}
                handleChange={handleChange}
              />
              
            </div>

            <div className={classes.half}>
              <h3 className={classes.formTitle}>Cadastro</h3>
              <div className={classes.facebookButton}>
                <img alt='facebook login button' src='/icons/facebook.jpg' />
                <p>
                  Facebook
                </p>
              </div>
              <div className={classes.googleButton}>
                <img alt='google plus login button' src='/icons/google-plus.png' />
                <p>
                  Google
                </p>
              </div>
              <div className={classes.textWithLineBehind}><span>ou cadastre-se com o email</span></div>

              <UserSignupForm {...toSignupForm} />

            </div>

          </div>
        </Collapse>
      </div>
    );
  }

  _renderDone() {
    return <div>Done</div>;
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