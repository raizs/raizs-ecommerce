import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import { UserSection } from './infoSections';

class InfoSections extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const { toUserSection } = this.props;

    return (
      <div>
        <UserSection {...toUserSection} />
      </div>
    )
  }
}

InfoSections = withStyles({})(InfoSections);

export { InfoSections };