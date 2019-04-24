import React from 'react'
import { UserSection, AddressSection, PaymentSection } from './infoSections';

let FormSections = props => {
  const { toUserSection, toAddressSection, toPaymentSection } = props;

  return (
    <div>
      <UserSection {...toUserSection} />
      <AddressSection {...toAddressSection} />
      <PaymentSection {...toPaymentSection} />
    </div>
  )
};

export { FormSections };