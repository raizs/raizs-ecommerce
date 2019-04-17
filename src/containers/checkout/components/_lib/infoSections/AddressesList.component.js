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
  newAddress: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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
      selectedAddress,
      handleRadioChange
    } = this.props;

    return (
      <RadioGroup
        name="userAddresses"
        className={classes.group}
        value={selectedAddress}
        onChange={e => handleRadioChange(e, 'userAddresses')}
      >
        {userAddresses.all.map(userAddress => (
          <div className={classes.option}>
            <FormControlLabel
              value={userAddress.id}
              control={<Radio />}
              label={userAddress.name}
            />
            <div className='text'>editar</div>
          </div>
        ))}
      </RadioGroup>
    );
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.wrapper}>
        {this._renderOptions()}
        <div className={classes.newAddress}>
          <Icon fontSize='20'>add_circle_outline</Icon>
          <p>Adicionar um novo endereço</p>
        </div>
        <Button onClick={() => console.log('ok')} className={classes.button}>Continuar</Button>
      </div>
    )
  }
}

AddressesList = withStyles(styles)(AddressesList);

export { AddressesList };