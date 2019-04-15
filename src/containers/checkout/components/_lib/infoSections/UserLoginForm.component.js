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

class UserLoginForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      loginEmailOrCellphone,
      loginPassword,
      handleChange,
      handleSubmit
    } = this.props;

    return (
      <form className={classes.wrapper}>
        <input
          className={classes.textInput}
          id='loginEmailOrCellphone'
          value={loginEmailOrCellphone}
          onChange={handleChange}
          placeholder='E-mail ou Celular'
        />
        <input
          className={classes.textInput}
          type='password'
          id='loginPassword'
          value={loginPassword}
          onChange={handleChange}
          placeholder='Senha'
        />
        <Button onClick={handleSubmit} className={classes.button}>Entrar</Button>
      </form>
    )
  }
}

UserLoginForm = withStyles(styles)(UserLoginForm);

export { UserLoginForm };