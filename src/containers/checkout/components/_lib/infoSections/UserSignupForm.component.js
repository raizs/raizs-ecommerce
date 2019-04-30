import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button } from '@material-ui/core';
import { TextInput } from '../../../../../molecules';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    marginTop: 3 * theme.spacing.unit,
  }
});

class UserSignupForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      errors,
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
      handleSignup,
      handleCompleteSignup
    } = this.props;

    const inputClass = isCompleteForm ? classes.textInputHalf : classes.textInput;

    return (
      <form className={classes.wrapper} onSubmit={e => { e.preventDefault(); isCompleteForm ? handleCompleteSignup() : handleSignup(); }}>
        <TextInput
          className={inputClass}
          id='signupName'
          value={signupName}
          handleChange={handleChange}
          placeholder='Nome'
          error={errors.signupName}
        />
        <TextInput
          className={inputClass}
          id='signupLastName'
          value={signupLastName}
          handleChange={handleChange}
          placeholder='Sobrenome'
          error={errors.signupLastName}
        />
        <TextInput
          className={inputClass}
          id='signupCpf'
          value={signupCpf}
          handleChange={e => handleChange(e, 'formatCpf')}
          placeholder='CPF'
          error={errors.signupCpf}
        />
        <TextInput
          className={inputClass}
          id='signupEmail'
          value={signupEmail}
          handleChange={handleChange}
          placeholder='E-mail'
          error={errors.signupEmail}
          disabled={isCompleteForm}
        />
        <TextInput
          className={inputClass}
          id='signupCellphone'
          value={signupCellphone}
          handleChange={e => handleChange(e, 'formatPhone')}
          placeholder='Celular'
          error={errors.signupCellphone}
        />
        <TextInput
          className={inputClass}
          type='password'
          id='signupPassword'
          value={signupPassword}
          handleChange={handleChange}
          placeholder='Senha'
          error={errors.signupPassword}
        />
        <Button
          id='signupButton'
          type='submit'
          className={classes.button}
        >
          {isCompleteForm ? 'Completar cadastro' : 'Cadastrar'}
        </Button>
      </form>
    )
  }
}

UserSignupForm = withStyles(styles)(UserSignupForm);

export { UserSignupForm };