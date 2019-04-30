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
  button: {
    ...theme.buttons.secondary,
    marginTop: 3 * theme.spacing.unit
  }
});

class UserLoginForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      errors,
      classes,
      loginEmailOrCellphone,
      loginPassword,
      handleChange,
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={classes.wrapper}>
        <TextInput
          className={classes.textInput}
          id='loginEmailOrCellphone'
          value={loginEmailOrCellphone}
          handleChange={handleChange}
          placeholder='E-mail ou Celular'
          error={errors.loginEmailOrCellphone}
          />
        <TextInput
          className={classes.textInput}
          type='password'
          id='loginPassword'
          value={loginPassword}
          handleChange={handleChange}
          placeholder='Senha'
          error={errors.loginPassword}
        />
        <Button
          id='loginAndPasswordButton'
          type='submit'
          onClick={handleSubmit}
          className={classes.button}
        >
          Entrar
        </Button>
      </form>
    )
  }
}

UserLoginForm = withStyles(styles)(UserLoginForm);

export { UserLoginForm };