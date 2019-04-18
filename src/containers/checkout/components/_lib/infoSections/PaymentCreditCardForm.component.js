import React, { Component } from 'react'
import { withStyles, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
  },
  textInput: {
    ...theme.inputs.text,
    width: `calc(50% - ${theme.spacing.unit}px)`,
    marginRight: theme.spacing.unit,
    '&:focus, &:active': {
      marginRight: theme.spacing.unit,
      padding: theme.spacing.unit,
      border: `1px solid ${theme.palette.green.main}`,
      outline: 'none'
    },
    '& + input': {
      marginTop: theme.spacing.unit
    }
  },
  formSubtitle: {
    ...theme.typography.formSubtitle,
    marginTop: 5 * theme.spacing.unit,
    textAlign: 'left'
  },
  radioInput: theme.inputs.radio,
  checkboxInput: theme.inputs.checkbox,
  checkedCheckboxInput: theme.inputs.checkedCheckbox,
});

class PaymentCreditCardForm extends Component {
  static defaultProps = {
    creditCards: {all: []}
  }

  _renderNewCreditCardForm() {
    const {
      classes,
      selectedCreditCard,
      handleChange,
      handleCheckboxChange,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.props;

    return !selectedCreditCard ? (
      <div>
        <input
          className={classes.textInput}
          id='creditCardNumber'
          value={creditCardNumber}
          onChange={e => handleChange(e, 'formatCreditCardNumber')}
          placeholder='Número do Cartão'
        />
        <input
          className={classes.textInput}
          id='creditCardName'
          value={creditCardName}
          onChange={handleChange}
          placeholder='Nome (como está no cartão)'
        />
        <input
          className={classes.textInput}
          id='creditCardExp'
          value={creditCardExp}
          onChange={e => handleChange(e, 'formatCreditCardExp')}
          placeholder='MM/AAAA'
        />
        <input
          className={classes.textInput}
          id='creditCardCvv'
          value={creditCardCvv}
          onChange={e => handleChange(e, 'formatCreditCardCvv')}
          placeholder='CVV'
        />
        <FormControlLabel
          className={classes.checkboxInput}
          control={
            <Checkbox
              checked={creditCardShouldSave}
              classes={{
                checked: classes.checkedCheckboxInput
              }}
              onChange={() => handleCheckboxChange('creditCardShouldSave')}
              value="creditCardShouldSave"
            />
          }
          label="Salvar Cartão"
        />
      </div>
    ) : null;
  }

  render() {
    const {
      classes,
      creditCards,
      selectedCreditCard,
      handleSelectCreditCard,
    } = this.props;

    const value = selectedCreditCard ? selectedCreditCard.idString : 'new';

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
          <FormControlLabel
            className={classes.radioInput}
            value='new'
            control={<Radio checked={'new' === value} />}
            label='Adicione um novo cartão'
          />
        </RadioGroup>
        {this._renderNewCreditCardForm()}
      </form>
    )
  }
}

PaymentCreditCardForm = withStyles(styles)(PaymentCreditCardForm);

export { PaymentCreditCardForm };