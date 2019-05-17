import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { TextInput } from '../../../../../molecules';

const styles = theme => ({
  textInput: {
    ...theme.inputs.text,
    '& + input': {
      marginTop: theme.spacing.unit
    },
    '&#text-input-addressReceiverName': {
      width: '50%',
      display: 'block'
    },
    '&#text-input-addressCep': {
      width: '25%',
      display: 'block'
    },
    '&#text-input-addressAddress': {
      width: `calc(57% - ${theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#text-input-addressNumber': {
      width: `calc(20% - ${2 * theme.spacing.unit}px)`,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#text-input-addressComplement': {
      width: `calc(23% - ${3 * theme.spacing.unit}px)`,
      marginLeft: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#text-input-addressNeighbourhood': {
      width: `calc(33% - ${theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#text-input-addressCity': {
      width: `calc(33% - ${2 * theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#text-input-addressState': {
      width: '15%',
      display: 'inline-block'
    }
  },
  checkboxInput: theme.inputs.checkbox,
  checkedCheckboxInput: theme.inputs.checkedCheckbox,
  button: {
    ...theme.buttons.primary,
    marginTop: 3 * theme.spacing.unit,
    display: 'inline-block'
  },
  secondaryButton: {
    ...theme.buttons.secondary,
    marginTop: 3 * theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    display: 'inline-block'
  }
});

class AddressForm extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const {
      classes,
      errors,
      hasAddresses,
      addressName,
      addressReceiverName,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      addressIsDefault,
      handleCheckboxChange,
      handleChange,
      handleCepBlur,
      handleNewAddressSubmit,
      handleUpdateAddressSubmit,
      handleViewUserAddresses,
      isEditingAddress
    } = this.props;

    return (
      <form className={classes.wrapper}>
        <TextInput
          className={classes.textInput}
          id='addressName'
          value={addressName}
          handleChange={handleChange}
          placeholder='Dê um nome para este endereço (Casa, Trabalho, Filhos...)'
          error={errors.addressName}
        />
        <TextInput
          className={classes.textInput}
          id='addressReceiverName'
          value={addressReceiverName}
          handleChange={handleChange}
          placeholder='Nome do recebedor'
          error={errors.addressReceiverName}
        />
        <TextInput
          className={classes.textInput}
          id='addressCep'
          value={addressCep}
          handleChange={e => handleChange(e, 'formatCEP')}
          handleBlur={handleCepBlur}
          error={errors.addressCep}
          placeholder='CEP'
        />
        <TextInput
          className={classes.textInput}
          id='addressAddress'
          value={addressAddress}
          handleChange={handleChange}
          placeholder='Endereço'
          error={errors.addressAddress}
        />
        <TextInput
          className={classes.textInput}
          id='addressNumber'
          value={addressNumber}
          handleChange={handleChange}
          placeholder='Número'
          error={errors.addressNumber}
        />
        <TextInput
          className={classes.textInput}
          id='addressComplement'
          value={addressComplement}
          handleChange={handleChange}
          placeholder='Complemento'
          error={errors.addressComplement}
        />
        <TextInput
          className={classes.textInput}
          id='addressNeighbourhood'
          value={addressNeighbourhood}
          handleChange={handleChange}
          placeholder='Bairro'
          error={errors.addressNeighbourhood}
        />
        <TextInput
          className={classes.textInput}
          id='addressCity'
          value={addressCity}
          handleChange={handleChange}
          placeholder='Cidade'
          error={errors.addressCity}
        />
        <TextInput
          className={classes.textInput}
          id='addressState'
          value={addressState}
          handleChange={handleChange}
          placeholder='Estado'
          error={errors.addressState}
        />
        {/* <FormControlLabel
          className={classes.checkboxInput}
          control={
            <Checkbox
              checked={addressIsDefault || !hasAddresses}
              classes={{
                checked: classes.checkedCheckboxInput
              }}
              onChange={() => handleCheckboxChange('addressIsDefault')}
              value="addressIsDefault"
            />
          }
          label="Salvar como Endereço Padrão"
        /> */}
        <div>
          <Button
            onClick={isEditingAddress ? handleUpdateAddressSubmit : handleNewAddressSubmit}
            className={classes.button}
          >
            {isEditingAddress ? 'Salvar' : 'Continuar'}
          </Button>
          {hasAddresses ? <Button onClick={handleViewUserAddresses} className={classes.secondaryButton}>Meus Endereços</Button> : null}
        </div>
      </form>
    )
  }
}

AddressForm = withStyles(styles)(AddressForm);

export { AddressForm };