import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';
import styles from './checkout.styles';

import {
  setUserAction,
  setUserAddressesAction,
  selectUserAddressAction,
  setCreditCardsAction,
  selectCreditCardAction
} from '../../store/actions';
import { FormSections, SummarySection } from './components';
import { withFirebase } from 'react-redux-firebase';

const actions = {
  setUserAction,
  setUserAddressesAction,
  selectUserAddressAction,
  setCreditCardsAction,
  selectCreditCardAction
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

    selectedPaymentMethod: 'creditCard',
    creditCardNumber: '5555-6666-7777-8884',
    creditCardName: 'MARCELO TESTE',
    creditCardExp: '12/2022',
    creditCardCvv: '123',
    creditCardShouldSave: true
  }

  componentDidMount() {
    if(this.props.user) this.controller.setUserInfo(this.props.user);
    if(this.props.userAddresses && this.props.userAddresses.all.length)
      this.setState({
        currentAddressSection: 'list',
        isAddressSectionDone: true,
        openedSection: 'payment'
      });
    if(this.props.creditCards && this.props.creditCards.all.length)
      this.setState({
        isPaymentSectionDone: true,
        openedSection: null
      });
  }

  componentWillReceiveProps(nextProps) {
    const prevUser = this.props.user, nextUser = nextProps.user;
    const prevUserAddresses = this.props.userAddresses, nextUserAddresses = nextProps.userAddresses;
    if(!prevUser && nextUser) {
      console.log('in here', nextUser);
      this.controller.setUserInfo(nextUser);
    }
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
      handleCompleteAddressSection,
      handleSelectPaymentMethod,
      handleSubmitPayment,
      handleSelectCreditCard,
      handleConfirmOrder
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
      isAddressSectionDone,
      
      isPaymentSectionDone,
      paymentSectionLoading,
      selectedPaymentMethod,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.state;

    const {
      user,
      classes,
      userAddresses,
      selectedUserAddress,
      creditCards,
      selectedCreditCard
    } = this.props;

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
      isPaymentSectionDone,
      handleOpenSection,
      creditCards,
      openedSection,
      paymentSectionLoading,
      isUserSectionDone,
      isAddressSectionDone,
      selectedPaymentMethod,
      handleSelectPaymentMethod,
      handleSubmitPayment,
      handleSelectCreditCard,
      handleChange,
      handleCheckboxChange,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      selectedCreditCard
    };

    return (
      <div>
        <FormSections
          toUserSection={toUserSection}
          toAddressSection={toAddressSection}
          toPaymentSection={toPaymentSection}
        />
        {
          isUserSectionDone && isAddressSectionDone && isPaymentSectionDone ?
          <Button className={classes.button} onClick={handleConfirmOrder}>
            Finalizar Pedido    
          </Button> 
          : null
        }
      </div>
    );
  }

  _renderSummary() {
    const { selectedDate, cart } = this.props;
    return <SummarySection selectedDate={selectedDate} cart={cart} />;
  }

  render() {
    const { classes } = this.props;

    console.log(this.props.userAddresses);

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
  selectedUserAddress: state.userAddresses.selected,
  creditCards: state.creditCards.model,
  selectedCreditCard: state.creditCards.selected,
  selectedDate: state.datePicker.selected
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Checkout);