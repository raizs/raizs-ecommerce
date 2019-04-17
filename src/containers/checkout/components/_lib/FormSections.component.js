import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import { UserSection, AddressSection, PaymentSection } from './infoSections';

class FormSections extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const { toUserSection, toAddressSection, toPaymentSection } = this.props;

    return (
      <div>
        <UserSection {...toUserSection} />
        <AddressSection {...toAddressSection} />
        <PaymentSection {...toPaymentSection} />
      </div>
    )
  }
}

FormSections = withStyles({})(FormSections);

export { FormSections };