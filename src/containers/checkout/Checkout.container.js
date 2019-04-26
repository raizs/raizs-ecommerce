import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';

import {
  setUserAction,
  setUserAddressesAction,
  selectUserAddressAction,
  setCreditCardsAction,
  selectCreditCardAction
} from '../../store/actions';
import { FormSections, SummarySection } from './components';
import { withFirebase } from 'react-redux-firebase';

const CONTENT_MAX_WIDTH = 1100;

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    padding: 3 * theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: theme.typography.bigTitle,
  content: {
    marginTop: 8 * theme.spacing.unit,
    width: '100%',
    maxWidth: `${CONTENT_MAX_WIDTH}px`,
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'top'
    }
  },
  info: {
    width: `calc(66% - ${2 * theme.spacing.unit}px)`,
    marginRight: 2 * theme.spacing.unit
  },
  summary: {
    width: `calc(33% - ${2 * theme.spacing.unit}px)`,
    marginLeft: 2 * theme.spacing.unit
  },
  button: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  }
});

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

  /**
   * componentDidMount - checks if user is logged in and if it has
   * adresses and credit cards. if so, handles the state to suit the actual
   * status.
   *
   * @memberof Checkout
   */
  componentDidMount() {
    const { user } = this.props;
    if(user) {
      this.controller.setUserInfo(user);
      if(user.addresses && user.addresses.all.length) {
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
    }
  }

  /**
   * componentWillReceiveProps - checks if user is logged in and if it has
   * adresses and credit cards. if so, handles the state to suit the actual
   * status.
   *
   * @memberof Checkout
   */
  componentWillReceiveProps(nextProps) {
    const prevUser = this.props.user, nextUser = nextProps.user;
    let prevUserAddresses, nextUserAddresses;
    if(prevUser) prevUserAddresses = this.props.user.addresses
    if(nextUser) nextUserAddresses = nextProps.user.addresses;
    
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

  /**
   * _renderForms - renders the form related components, which are 'users',
   * 'addresses' and 'payment'
   *
   * @returns {JSX} which contains the FormSection component and a Button if the forms are
   * complete
   * 
   * @memberof Checkout
   */
  _renderForms() {
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
      selectedUserAddress,
      creditCards,
      selectedCreditCard
    } = this.props;

    const userAddresses = user.addresses;

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
      user,
      userAddresses,
      currentAddressSection,
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

  /**
   * _renderSummary - renders the cart summary section
   *
   * @returns {SummarySection}
   * @memberof Checkout
   */
  _renderSummary() {
    const { selectedDate, cart } = this.props;
    return <SummarySection selectedDate={selectedDate} cart={cart} />;
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
            {this._renderForms()}
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