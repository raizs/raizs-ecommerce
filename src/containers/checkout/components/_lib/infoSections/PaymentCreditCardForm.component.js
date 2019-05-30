import React, { Component } from 'react'
import { withStyles, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { TextInput } from '../../../../../molecules';

const styles = theme => ({
  group: {
    display: 'inline-block',
    '& > label': {
      display: 'flex'
    }
  },
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
    textAlign: 'left'
  },
  radioInput: theme.inputs.radio,
  checkboxInput: theme.inputs.checkbox,
  checkedCheckboxInput: theme.inputs.checkedCheckbox,
});

class PaymentCreditCardForm extends Component {
  static defaultProps = {
    cards: {all: []}
  }

  _renderNewCardForm() {
    const {
      errors,
      classes,
      selectedCard,
      handleChange,
      handleCheckboxChange,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.props;

    return !selectedCard ? (
      <div>
        <TextInput
          className={classes.textInput}
          id='creditCardNumber'
          value={creditCardNumber}
          handleChange={e => handleChange(e, 'formatCardNumber')}
          handleBlur={handleCardNumberBlur}
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
          handleChange={e => handleChange(e, 'formatCardExp')}
          handleBlur={handleCardExpDateBlur}
          placeholder='MM/AAAA'
          error={errors.creditCardExp}
        />
        <TextInput
          className={classes.textInput}
          id='creditCardCvv'
          value={creditCardCvv}
          handleChange={e => handleChange(e, 'formatCardCvv')}
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
      cards,
      selectedCard,
      handleSelectCard,
    } = this.props;

    const value = selectedCard ? selectedCard.id : 'new';

    return (
      <form>
        <h6 className={classes.formSubtitle}>Cartões de Crédito Salvos</h6>
        <RadioGroup
          name="cards"
          className={classes.group}
          inputref='div'
          value={value}
          onChange={e => handleSelectCard(e)}
        >
          {cards.creditCards.map(card => {
            return (
              <FormControlLabel
                key={card.id}
                className={classes.radioInput}
                value={card.id}
                control={<Radio checked={card.id === value} />}
                label={card.finalString}
              />
            );
          })}
          <FormControlLabel
            className={classes.radioInput}
            value='new'
            control={<Radio checked={'new' === value} />}
            label='Adicione um novo cartão de crédito'
          />
        </RadioGroup>
        {this._renderNewCardForm()}
      </form>
    )
  }
}

PaymentCreditCardForm = withStyles(styles)(PaymentCreditCardForm);

export { PaymentCreditCardForm };