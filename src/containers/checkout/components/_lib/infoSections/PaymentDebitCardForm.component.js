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
    '&#text-input-debitCardExp, &#text-input-debitCardCvv': {
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

class PaymentDebitCardForm extends Component {

  _renderNewCardForm() {
    const {
      errors,
      classes,
      selectedCard,
      handleChange,
      handleCheckboxChange,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave
    } = this.props;

    return !selectedCard ? (
      <div>
        <TextInput
          className={classes.textInput}
          id='debitCardNumber'
          value={debitCardNumber}
          handleChange={e => handleChange(e, 'formatCardNumber')}
          handleBlur={handleCardNumberBlur}
          placeholder='Número do Cartão'
          error={errors.debitCardNumber}
        />
        <TextInput
          className={classes.textInput}
          id='debitCardName'
          value={debitCardName}
          handleChange={handleChange}
          placeholder='Nome (como está no cartão)'
          error={errors.debitCardName}
        />
        <TextInput
          className={classes.textInput}
          id='debitCardExp'
          value={debitCardExp}
          handleChange={e => handleChange(e, 'formatCardExp')}
          handleBlur={handleCardExpDateBlur}
          placeholder='MM/AAAA'
          error={errors.debitCardExp}
        />
        <TextInput
          className={classes.textInput}
          id='debitCardCvv'
          value={debitCardCvv}
          handleChange={e => handleChange(e, 'formatCardCvv')}
          placeholder='CVV'
          error={errors.debitCardCvv}
        />
        <FormControlLabel
          className={classes.checkboxInput}
          control={
            <Checkbox
              checked={debitCardShouldSave}
              classes={{
                checked: classes.checkedCheckboxInput
              }}
              onChange={() => handleCheckboxChange('debitCardShouldSave')}
              value="debitCardShouldSave"
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
        <h6 className={classes.formSubtitle}>Cartões de Débito Salvos</h6>
        <RadioGroup
          name="cards"
          className={classes.group}
          inputref='div'
          value={value}
          onChange={e => handleSelectCard(e)}
        >
          {cards.debitCards.map(card => {
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
            label='Adicione um novo cartão de débito'
          />
        </RadioGroup>
        {this._renderNewCardForm()}
      </form>
    )
  }
}

PaymentDebitCardForm = withStyles(styles)(PaymentDebitCardForm);

export { PaymentDebitCardForm };