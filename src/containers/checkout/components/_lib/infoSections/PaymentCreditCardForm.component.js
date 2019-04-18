import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

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
  formSubtitle: {
    ...theme.typography.formSubtitle,
    marginTop: 5 * theme.spacing.unit
  },
  radioInput: theme.inputs.radio,
  button: {
    ...theme.buttons.secondary,
    marginTop: 3 * theme.spacing.unit
  }
});

class PaymentCreditCardForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      creditCards = [],
      selectedCreditCard,
      handleSelectCreditCard,
      handleSubmit
    } = this.props;

    const value = selectedCreditCard ? selectedCreditCard.idString : null;

    return (
      <form className={classes.wrapper}>
        <h6 className={classes.formSubtitle}>Cartões Salvos</h6>
        <RadioGroup
          name="creditCards"
          className={classes.group}
          inputref='div'
          value={value}
          onChange={e => handleSelectCreditCard(e)}
        >
          {creditCards.all.map(creditCard => {
            return (
              <FormControlLabel
                className={classes.radioInput}
                value={creditCard.idString}
                control={<Radio checked={creditCard.idString === value} />}
                label={creditCard.displayName}
              />
            );
          })}
        </RadioGroup>
        <Button onClick={handleSubmit} className={classes.button}>Entrar</Button>
      </form>
    )
  }
}

PaymentCreditCardForm = withStyles(styles)(PaymentCreditCardForm);

export { PaymentCreditCardForm };