import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse } from '@material-ui/core';
import classnames from 'classnames'; 

import { Loading } from '../../../../../molecules';

import { AddressForm, AddressesList } from '.';

const styles = theme => ({
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.green.main,
    borderTopRightRadius: theme.spacing.unit,
    borderTopLeftRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    userSelect: 'none',
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    '&.-inactive': {
      backgroundColor: theme.palette.gray.darkBg,
      borderRadius: theme.spacing.unit
    }
  },
  number: {
    color: 'white',
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .3)',
    '&.-inactive': {
      color: theme.palette.gray.main,
      backgroundColor: 'white'
    }
  },
  label: {
    color: 'white',
    fontWeight: 600,
    marginLeft: theme.spacing.unit,
    '&.-inactive': {
      color: theme.palette.gray.main
    }
  },
  content: {
    position: 'relative',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
    padding: `0 ${3 * theme.spacing.unit}px`
  },
  formTitle: {
    ...theme.typography.formTitle,
    textAlign: 'left'
  },
  doneWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  doneNumber: {
    display: 'inline-block',
    color: theme.palette.green.main,
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.gray.bg
  },
  doneLabel: {
    display: 'inline-block',
    color: theme.palette.gray.main,
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  doneInfo: {
    color: theme.palette.gray.main,
    lineHeight: '1.375em'
  },
  doneChange: {
    color: theme.palette.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.green.main
    }
  }
});

class AddressSection extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  _renderCollapsibleContent() {
    const {
      classes,
      user,
      errors,
      currentAddressSection,
      addressSectionLoading,
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
      handleChange,
      handleCheckboxChange,
      handleCepBlur,
      handleNewAddressSubmit,
      handleUpdateAddressSubmit,
      handleViewUserAddresses,
      selectedUserAddress,
      handleSelectUserAddress,
      handleNewAddressForm,
      handleEditUserAddress,
      isEditingAddress,
      handleCompleteAddressSection
    } = this.props;
    
    const toAddressForm = {
      errors,
      handleChange,
      handleCheckboxChange,
      handleCepBlur,
      handleNewAddressSubmit,
      handleUpdateAddressSubmit,
      handleViewUserAddresses,
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
      isEditingAddress
    };

    const toAddressesList = {
      user,
      handleSelectUserAddress,
      handleNewAddressForm,
      selectedUserAddress,
      handleEditUserAddress,
      handleCompleteAddressSection
    };

    let Comp = {
      form: AddressForm,
      list: AddressesList
    }[currentAddressSection];
    let compProps = {
      form: toAddressForm,
      list: toAddressesList
    }[currentAddressSection];

    const hasAddresses = user && user.hasAddress;

    if(!hasAddresses) {
      Comp = AddressForm;
      compProps = toAddressForm
    };

    return (
      <div>
        { addressSectionLoading && <Loading absolute /> }

        <div className={classes.whole}>
          <h3 className={classes.formTitle}>Endereço de Entrega</h3>
          {<Comp hasAddresses={hasAddresses} {...compProps} />}
        </div>
      </div>
    )
  }

  _renderCollapsible() {
    const { classes, openedSection, isUserSectionDone } = this.props;
    const isOpen = openedSection === 'address';

    const isInacitve = !isUserSectionDone;
    const titleClasses = [classes.title],
      numberClasses = [classes.number],
      labelClasses = [classes.label];
    if(isInacitve) {
      titleClasses.push('-inactive');
      numberClasses.push('-inactive');
      labelClasses.push('-inactive');
    }

    return (
      <div className={classes.section}>

        <div className={classnames(titleClasses)}>
          <div className={classnames(numberClasses)}>2</div>
          <h4 className={classnames(labelClasses)}>ENTREGA</h4>
        </div>
        
        <Collapse in={isOpen}>
          <div className={classes.content}>
            {this._renderCollapsibleContent()}
          </div>
        </Collapse>
      </div>
    );
  }

  _renderDone() {
    const { classes, handleOpenSection } = this.props;
    return (
      <div className={classes.doneWrapper}>
        <div>
          <div className={classes.doneNumber}>2</div>
          <h4 className={classes.doneLabel}>ENTREGA</h4>
        </div>
        {this._renderDoneInfo()}
        <div className={classes.doneChange} onClick={() => handleOpenSection('address')}>
          alterar
        </div>
      </div>
    );
  }

  _renderDoneInfo() {
    const { classes, selectedUserAddress } = this.props;
    return selectedUserAddress ? (
      <div>
        <div className={classes.doneInfo}>
          {selectedUserAddress.name}{selectedUserAddress.isDefaultAddress ? ' (endereço padrão)' : ''}
        </div>
        <div className={classes.doneInfo}>Para: {selectedUserAddress.receiverName}</div>
        <div className={classes.doneInfo}>{selectedUserAddress.cep}</div>
        <div className={classes.doneInfo}>{selectedUserAddress.formattedAddress}</div>
        <div className={classes.doneInfo}>{selectedUserAddress.formattedAddress2}</div>
      </div>
    ) : null;
  }

  _renderSection() {
    const { isAddressSectionDone } = this.props;

    if(isAddressSectionDone) return this._renderDone();
    return this._renderCollapsible();
  }

  render() {
    return this._renderSection();
  }
}

AddressSection = withStyles(styles)(AddressSection);

export { AddressSection };