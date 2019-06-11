import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';
import { Loading } from '../../molecules';

import {
  setUserAction,
  setUserAddressesAction,
  selectUserAddressAction,
  setCardsAction,
  selectCardAction,
  setSaleOrdersAction
} from '../../store/actions';
import { FormSections, SummarySection } from './components';

const CONTENT_MAX_WIDTH = 1100;

const styles = theme => ({
  wrapper: {
    minHeight: window.innerHeight - 64,
    userSelect: 'none',
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    padding: 3 * theme.spacing.unit,
    paddingBottom: 8 * theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > h1': theme.typography.raizs,
    '& > h3': {
      ...theme.typography.subtitle,
      marginTop: 2 * theme.spacing.unit
    }
  },
  content: {
    marginTop: 4 * theme.spacing.unit,
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
  setCardsAction,
  selectCardAction,
  setSaleOrdersAction
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
    loading:false,
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
    creditCardNumber: '',
    creditCardName: '',
    creditCardExp: '',
    creditCardCvv: '',
    creditCardShouldSave: true,

    debitCardNumber: '',
    debitCardName: '',
    debitCardExp: '',
    debitCardCvv: '',
    debitCardShouldSave: '',
    
    errors: {
      loginEmailOrCellphone: '',
      loginPassword: '',
      signupName: '',
      signupLastName: '',
      signupCpf: '',
      signupEmail: '',
      signupCellphone: '',
      signupPassword: '',
      addressName: '',
      addressReceiverName: '',
      addressCep: '',
      addressAddress: '',
      addressNumber: '',
      addressComplement: '',
      addressNeighbourhood: '',
      addressCity: '',
      addressState: '',
      creditCardNumber: '',
      creditCardName: '',
      creditCardExp: '',
      creditCardCvv: ''
    }
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
        if(this.props.cards && this.props.cards.all.length)
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
    const prevCards = this.props.cards, nextCards = nextProps.cards;
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
    if(nextUser && !prevUserAddresses && nextUserAddresses && nextUserAddresses.all.length)
      this.setState({
        currentAddressSection: 'list',
        isAddressSectionDone: true,
        openedSection: 'payment'
      });
      
    if(nextUser && nextUserAddresses && nextUserAddresses.all.length && !prevCards && nextCards && nextCards.all.length) {
      this.setState({
        openedSection: null,
        isPaymentSectionDone: true
      });
    }
  }

  /**
   * _renderForms - renders the form related components, which are 'user',
   * 'address' and 'payment'
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
      handleSignup,
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
      handleSelectCard,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      handleConfirmOrder
    } = this.controller;

    const {
      errors,
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
      creditCardShouldSave,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave
    } = this.state;

    const {
      user,
      classes,
      selectedUserAddress,
      cards,
      selectedCard
    } = this.props;

    const toUserSection = {
      user,
      errors,
      userSectionLoading,
      handleChange,
      handleCheckboxChange,
      handleGoogleSignin,
      handleSignup,
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
      errors,
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
      errors,
      selectedCard,
      isPaymentSectionDone,
      handleOpenSection,
      cards,
      openedSection,
      paymentSectionLoading,
      isUserSectionDone,
      isAddressSectionDone,
      selectedPaymentMethod,
      handleSelectPaymentMethod,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      handleSubmitPayment,
      handleSelectCard,
      handleChange,
      handleCheckboxChange,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave
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
          <Button id='checkout' className={classes.button} onClick={handleConfirmOrder}>
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
    const { selectedDate, cart, subscriptionCart, coupon, giftCard } = this.props;
    return <SummarySection giftCard={giftCard} coupon={coupon} selectedDate={selectedDate} cart={cart} subscriptionCart={subscriptionCart} />;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {this.state.loading && <Loading absolute/>}
        <h1>
          CHECKOUT
        </h1>
        <h3>Falta pouco para você finalizar o seu pedido!<br/>Basta preencher os dados abaixo:</h3>
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
  subscriptionCart: state.subscriptionCart,
  user: state.user.current,
  userAddresses: state.userAddresses.model,
  selectedUserAddress: state.userAddresses.selected,
  cards: state.cards.model,
  selectedCard: state.cards.selected,
  selectedDate: state.datePicker.selected,
  momentDate: state.datePicker.momentDate,
  currentCep: state.cep.current,
  coupon: state.coupon.selected,
  giftCard: state.giftCard,
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Checkout);