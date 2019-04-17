import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, RadioGroup, FormControlLabel, Radio as MuiRadio } from '@material-ui/core';

// DOING LATER

const Radio = props => {
  return (
    <RadioGroup
        name="userAddresses"
        className={classes.group}
        value={selectedAddress}
        onChange={e => handleRadioChange(e, 'userAddresses')}
      >
      {userAddresses.all.map(userAddress => (
        <FormControlLabel
          value={userAddress.id}
          control={<MuiRadio />}
          label={userAddress.name}
        />
      ))}
    </RadioGroup>
  )
};

Radio.propTypes = {

}

Radio = withStyles(styles)(Radio);

export { Radio };