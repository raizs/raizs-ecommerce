import React, { Component } from 'react'
import { withStyles, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { TextInput } from '../../../../../molecules';

const styles = theme => ({
  textInput: {
    ...theme.inputs.text,
    width: `calc(50% - ${theme.spacing.unit}px)`,
    display: 'inline-block',
    marginRight: theme.spacing.unit,
    '& + div.text-input': {
      marginTop: 0
    },
    '&#text-input-creditCardExp, &#text-input-creditCardCvv': {
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
      errors,
      classes,
      selectedCreditCard,
      handleChange,
      handleCheckboxChange,
      handleCreditCardNumberBlur,
      handleCreditCardExpDateBlur,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.props;

    return !selectedCreditCard ? (
      <div>
        <TextInput
          className={classes.textInput}
          id='creditCardNumber'
          value={creditCardNumber}
          handleChange={e => handleChange(e, 'formatCreditCardNumber')}
          handleBlur={handleCreditCardNumberBlur}
          placeholder='Número do Cartão'
          error={errors.creditCardNumber}
        />
        <TextInput
          className={classes.textInput}
          id='creditCardName'
          value={creditCardName}
          handleChange={handleChange}
          placeholder='Nome (como está no cartão)'
          error={errors.creditCardName}
        />
        <TextInput
          className={classes.textInput}
          id='creditCardExp'
          value={creditCardExp}
          handleChange={e => handleChange(e, 'formatCreditCardExp')}
          handleBlur={handleCreditCardExpDateBlur}
          placeholder='MM/AAAA'
          error={errors.creditCardExp}
        />
        <TextInput
          className={classes.textInput}
          id='creditCardCvv'
          value={creditCardCvv}
          handleChange={e => handleChange(e, 'formatCreditCardCvv')}
          placeholder='CVV'
          error={errors.creditCardCvv}
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

    const value = selectedCreditCard ? selectedCreditCard.id : 'new';

    return (
      <form>
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
                key={creditCard.id}
                className={classes.radioInput}
                value={creditCard.id}
                control={<Radio checked={creditCard.id === value} />}
                label={creditCard.finalString}
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