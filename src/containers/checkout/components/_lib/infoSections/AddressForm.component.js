import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, FormControlLabel, Checkbox } from '@material-ui/core';

const styles = theme => ({
  textInput: {
    ...theme.inputs.text,
    '& + input': {
      marginTop: theme.spacing.unit
    },
    '&#addressReceiverName': {
      width: '50%',
      display: 'block'
    },
    '&#addressCep': {
      width: '25%',
      display: 'block'
    },
    '&#addressAddress': {
      width: `calc(60% - ${theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#addressNumber': {
      width: `calc(15% - ${2 * theme.spacing.unit}px)`,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#addressComplement': {
      width: `calc(25% - ${3 * theme.spacing.unit}px)`,
      marginLeft: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#addressNeighbourhood': {
      width: `calc(33% - ${theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#addressCity': {
      width: `calc(33% - ${2 * theme.spacing.unit}px)`,
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      display: 'inline-block'
    },
    '&#addressState': {
      width: '15%',
      display: 'inline-block'
    }
  },
  checkboxInput: {
    userSelect: 'none',
    '& span': {
      fontWeight: 700
    },
    '& svg': {
      fill: theme.palette.gray.main
    }
  },
  checkedCheckboxInput: {
    userSelect: 'none',
    '& span': {
      fontWeight: 700
    },
    '& svg': {
      fill: theme.palette.green.main
    }
  },
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
        <input
          className={classes.textInput}
          id='addressName'
          value={addressName}
          onChange={handleChange}
          placeholder='Dê um nome para este endereço (Casa, Trabalho, Filhos...)'
        />
        <input
          className={classes.textInput}
          id='addressReceiverName'
          value={addressReceiverName}
          onChange={handleChange}
          placeholder='Nome do recebedor'
        />
        <input
          className={classes.textInput}
          id='addressCep'
          value={addressCep}
          onChange={e => handleChange(e, 'formatCEP')}
          onBlur={handleCepBlur}
          placeholder='CEP'
        />
        <input
          className={classes.textInput}
          id='addressAddress'
          value={addressAddress}
          onChange={handleChange}
          placeholder='Endereço'
        />
        <input
          className={classes.textInput}
          id='addressNumber'
          value={addressNumber}
          onChange={handleChange}
          placeholder='Número'
        />
        <input
          className={classes.textInput}
          id='addressComplement'
          value={addressComplement}
          onChange={handleChange}
          placeholder='Complemento'
        />
        <input
          className={classes.textInput}
          id='addressNeighbourhood'
          value={addressNeighbourhood}
          onChange={handleChange}
          placeholder='Bairro'
        />
        <input
          className={classes.textInput}
          id='addressCity'
          value={addressCity}
          onChange={handleChange}
          placeholder='Cidade'
        />
        <input
          className={classes.textInput}
          id='addressState'
          value={addressState}
          onChange={handleChange}
          placeholder='Estado'
        />
        <FormControlLabel
          className={classes.checkboxInput}
          control={
            <Checkbox
              checked={addressIsDefault}
              classes={{
                checked: classes.checkedCheckboxInput
              }}
              onChange={() => handleCheckboxChange('addressIsDefault')}
              value="addressIsDefault"
            />
          }
          label="Salvar como Endereço Padrão"
        />
        <div>
          <Button
            onClick={isEditingAddress ? handleUpdateAddressSubmit : handleNewAddressSubmit}
            className={classes.button}
          >
            {isEditingAddress ? 'Salvar' : 'Continuar'}
          </Button>
          {hasAddresses && <Button onClick={handleViewUserAddresses} className={classes.secondaryButton}>Ver Endereços</Button>}
        </div>
      </form>
    )
  }
}

AddressForm = withStyles(styles)(AddressForm);

export { AddressForm };