import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';
import styles from './checkout.styles';

import { setUserAction, setUserAddressesAction, selectUserAddressAction } from '../../store/actions';
import { FormSections } from './components';
import { withFirebase } from 'react-redux-firebase';

const actions = {
  setUserAction,
  setUserAddressesAction,
  selectUserAddressAction
};

/**
 * Checkout - Container 'Checkout'
 *
 * @export
 * @class Checkout
 * @extends {BaseContainer}
 */
class Checkout extends BaseContainer {
  constructor(props) {
    super(props, CheckoutController);
  }

  state = {
    openedSection: 'user',
    userSectionLoading: false,
    addressSectionLoading: false,
    paymentSectionLoading: false,
    
    isUserSectionDone: false,
    isAddressSectionDone: false,
    isPaymentSectionDone: false,

    loginEmailOrCellphone: '',
    loginPassword: '',
    signupName: '',
    signupLastName: '',
    signupCpf: '',
    signupEmail: '',
    signupCellphone: '',
    signupPassword: '',
    signupNews: false,

    currentAddressSection: 'form',
    addressName: '',
    addressReceiverName: '',
    addressCep: '',
    addressAddress: '',
    addressNumber: '',
    addressComplement: '',
    addressNeighbourhood: '',
    addressCity: '',
    addressState: '',
    addressIsDefault: false,
    isEditingAddress: false,
    editingAddressId: null,
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    if(this.props.user) this.controller.setUserInfo(this.props.user);
    if(this.props.userAddresses && this.props.userAddresses.all.length)
      this.setState({
        currentAddressSection: 'list',
        isAddressSectionDone: true,
        openedSection: 'payment'
      });
  }

  componentWillReceiveProps(nextProps) {
    const prevUser = this.props.user, nextUser = nextProps.user;
    const prevUserAddresses = this.props.userAddresses, nextUserAddresses = nextProps.userAddresses;
    if(!prevUser && nextUser) this.controller.setUserInfo(nextUser);
    if(!nextUser && prevUser) {
      this.controller.clearUserInfo();
      this.setState({
        openedSection: 'user',
        isUserSectionDone: false,
        isAddressSectionDone: false,
        isPaymentSectionDone: false
      });
    }
    if(!prevUserAddresses && nextUserAddresses && nextUserAddresses.all.length)
      this.setState({ currentAddressSection: 'list' });
  }

  _renderInfo() {
    const {
      handleChange,
      handleCheckboxChange,
      handleRadioChange,
      handleGoogleSignin,
      handleCompleteSignup,
      handleEmailAndPasswordLogin,
      handleOpenSection,
      handleCepBlur,
      handleNewAddressSubmit,
      handleUpdateAddressSubmit,
      handleSelectUserAddress,
      handleViewUserAddresses,
      handleNewAddressForm,
      handleEditUserAddress,
      handleCompleteAddressSection
    } = this.controller;

    const {
      openedSection,

      userSectionLoading,
      loginEmailOrCellphone,
      loginPassword,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews,
      isUserSectionDone,

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
      isEditingAddress,
      isAddressSectionDone
    } = this.state;

    const { user, userAddresses, selectedUserAddress } = this.props;

    const toUserSection = {
      user,
      userSectionLoading,
      handleChange,
      handleCheckboxChange,
      handleGoogleSignin,
      handleCompleteSignup,
      handleEmailAndPasswordLogin,
      handleOpenSection,
      loginEmailOrCellphone,
      loginPassword,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews,
      openedSection,
      isUserSectionDone
    };

    const toAddressSection = {
      currentAddressSection,
      userAddresses,
      addressSectionLoading,
      handleOpenSection,
      handleChange,
      handleCheckboxChange,
      handleRadioChange,
      handleCepBlur,
      handleNewAddressSubmit,
      handleUpdateAddressSubmit,
      handleSelectUserAddress,
      handleViewUserAddresses,
      handleNewAddressForm,
      handleEditUserAddress,
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
      selectedUserAddress,
      isEditingAddress,
      isAddressSectionDone,
      isUserSectionDone,
      openedSection,
      handleCompleteAddressSection
    };
    
    const toPaymentSection = {
      openedSection,
      isUserSectionDone,
      isAddressSectionDone
    };

    return (
      <FormSections
        toUserSection={toUserSection}
        toAddressSection={toAddressSection}
        toPaymentSection={toPaymentSection}
      />
    );
  }

  _renderSummary() {
    return  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at felis aliquam quam maximus rhoncus. Maecenas sodales leo eu ante ultricies gravida. Etiam dignissim rhoncus mollis. Nam a lacus euismod, tempus dolor sit amet, gravida tellus. Vivamus gravida, dolor vitae porta cursus, felis ligula ultricies ante, eu tempor arcu nunc id orci. Vivamus gravida mollis sem et tincidunt. Aliquam tincidunt neque a elit molestie tincidunt.
    </div>;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.title}>
          CHECKOUT
        </h1>
        <div className={classes.content}>
          <div className={classes.info}>
            {this._renderInfo()}
          </div>
          <div className={classes.summary}>
            {this._renderSummary()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  user: state.user.current,
  userAddresses: state.userAddresses.model,
  selectedUserAddress: state.userAddresses.selected
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Checkout);