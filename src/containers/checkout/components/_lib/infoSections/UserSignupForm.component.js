import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  textInput: {
    ...theme.inputs.text,
    '& + input': {
      marginTop: theme.spacing.unit
    }
  },
  textInputHalf: {
    ...theme.inputs.text,
    maxWidth: '50%',
    '& + input': {
      marginTop: theme.spacing.unit
    }
  },
  button: {
    ...theme.buttons.secondary,
    marginTop: 3 * theme.spacing.unit
  }
});

class UserSignupForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      isCompleteForm,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews,
      handleCheckbox,
      handleChange,
      handleCompleteSignup
    } = this.props;

    const inputClass = isCompleteForm ? classes.textInputHalf : classes.textInput;

    return (
      <form className={classes.wrapper}>
        <input
          className={inputClass}
          id='signupName'
          value={signupName}
          onChange={handleChange}
          placeholder='Nome'
        />
        <input
          className={inputClass}
          id='signupLastName'
          value={signupLastName}
          onChange={handleChange}
          placeholder='Sobrenome'
        />
        <input
          className={inputClass}
          id='signupCpf'
          value={signupCpf}
          onChange={e => handleChange(e, 'formatCpf')}
          placeholder='CPF'
        />
        <input
          className={inputClass}
          id='signupEmail'
          value={signupEmail}
          onChange={handleChange}
          placeholder='E-mail'
        />
        <input
          className={inputClass}
          id='signupCellphone'
          value={signupCellphone}
          onChange={e => handleChange(e, 'formatPhone')}
          placeholder='Celular'
        />
        <input
          className={inputClass}
          type='password'
          id='signupPassword'
          value={signupPassword}
          onChange={handleChange}
          placeholder='Senha'
        />
        <Button
          className={classes.button}
          onClick={isCompleteForm ? handleCompleteSignup : () => console.log('todo create signup')}
        >
          {isCompleteForm ? 'Completar cadastro' : 'Cadastrar'}
        </Button>
      </form>
    )
  }
}

UserSignupForm = withStyles(styles)(UserSignupForm);

export { UserSignupForm };