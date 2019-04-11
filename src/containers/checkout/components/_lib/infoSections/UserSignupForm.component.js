import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button } from '@material-ui/core';

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

class UserSignupForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews,
      handleCheckbox,
      handleChange
    } = this.props;

    return (
      <form className={classes.wrapper}>
        <input
          className={classes.textInput}
          id='signupName'
          value={signupName}
          onChange={handleChange}
          placeholder='Nome'
        />
        <input
          className={classes.textInput}
          id='signupLastName'
          value={signupLastName}
          onChange={handleChange}
          placeholder='Sobrenome'
        />
        <input
          className={classes.textInput}
          id='signupCpf'
          value={signupCpf}
          onChange={handleChange}
          placeholder='CPF'
        />
        <input
          className={classes.textInput}
          id='signupEmail'
          value={signupEmail}
          onChange={handleChange}
          placeholder='E-mail'
        />
        <input
          className={classes.textInput}
          id='signupCellphone'
          value={signupCellphone}
          onChange={handleChange}
          placeholder='Celular'
        />
        <input
          className={classes.textInput}
          type='password'
          id='signupPassword'
          value={signupPassword}
          onChange={handleChange}
          placeholder='Senha'
        />
        <Button className={classes.button}>Cadastrar</Button>
      </form>
    )
  }
}

UserSignupForm = withStyles(styles)(UserSignupForm);

export { UserSignupForm };