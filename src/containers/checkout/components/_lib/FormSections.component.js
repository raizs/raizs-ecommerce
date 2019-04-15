import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import { UserSection, AddressSection } from './infoSections';

class FormSections extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const { toUserSection, toAddressSection } = this.props;

    return (
      <div>
        <UserSection {...toUserSection} />
        <AddressSection {...toAddressSection} />
      </div>
    )
  }
}

FormSections = withStyles({})(FormSections);

export { FormSections };