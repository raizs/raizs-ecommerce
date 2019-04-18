import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, FormControlLabel, RadioGroup, Radio, Icon } from '@material-ui/core';

const styles = theme => ({
  wrapper: {

  },
  option: {
    display: 'flex',
    alignItems: 'center',
    '& .text': {
      fontSize: theme.fontSizes.XS,
      color: theme.palette.green.main,
      textDecoration: 'underline',
      cursor: 'pointer',
      fontWeight: 700
    }
  },
  radioInput: theme.inputs.radio,
  newAddress: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: theme.spacing.unit,
    '& *': {
      color: theme.palette.green.main
    },
    '& p': {
      textDecoration: 'underline',
      fontWeight: 700,
      marginLeft: theme.spacing.unit
    }
  },
  button: {
    ...theme.buttons.primary,
    marginTop: 3 * theme.spacing.unit,
    display: 'block'
  }
});

class AddressesList extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  _renderOptions() {
    const {
      classes,
      userAddresses,
      selectedUserAddress,
      handleSelectUserAddress,
      handleEditUserAddress
    } = this.props;

    const value = selectedUserAddress ? selectedUserAddress.idString : null;
    
    return (
      <RadioGroup
        name="userAddresses"
        className={classes.group}
        inputref='div'
        value={value}
        onChange={e => handleSelectUserAddress(e)}
      >
        {userAddresses.all.map(userAddress => {
          let label = userAddress.name;
          if(userAddress.isDefaultAddress) label += ' (endereço padrão)';
          return (
            <div className={classes.option} key={userAddress.id}>
              <FormControlLabel
                className={classes.radioInput}
                value={userAddress.idString}
                control={<Radio checked={userAddress.idString === value} />}
                label={label}
              />
              <div className='text' onClick={() => handleEditUserAddress(userAddress)}>editar</div>
            </div>
          );
        })}
      </RadioGroup>
    );
  }

  render() {
    const {
      classes,
      handleNewAddressForm,
      handleCompleteAddressSection
    } = this.props;

    return (
      <div className={classes.wrapper}>
        {this._renderOptions()}
        <div className={classes.newAddress}>
          <Icon fontSize='small' onClick={handleNewAddressForm}>add_circle_outline</Icon>
          <p onClick={handleNewAddressForm}>Adicionar um novo endereço</p>
        </div>
        <Button onClick={handleCompleteAddressSection} className={classes.button}>Continuar</Button>
      </div>
    )
  }
}

AddressesList = withStyles(styles)(AddressesList);

export { AddressesList };