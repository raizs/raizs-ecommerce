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
    openedSection: 'address',
    userSectionLoading: false,
    addressSectionLoading: false,

    loginEmailOrCellphone: '',
    loginPassword: '',

    signupName: '',
    signupLastName: '',
    signupCpf: '',
    signupEmail: '',
    signupCellphone: '',
    signupPassword: '',
    signupNews: false,

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
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    if(this.props.user) this.controller.setUserInfo(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    const oldUser = this.props.user, nextUser = nextProps.user;
    if(!oldUser && nextUser) this.controller.setUserInfo(nextUser);
    if(!nextUser && oldUser) this.controller.clearUserInfo();
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
      handleNewAddressSubmit
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

      addressSectionLoading,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      addressIsDefault,
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
      isOpen: openedSection === 'user',
      isDone: user && user.isComplete && openedSection !== 'user'
    };

    const toAddressSection = {
      userAddresses,
      addressSectionLoading,
      handleChange,
      handleCheckboxChange,
      handleRadioChange,
      handleCepBlur,
      handleNewAddressSubmit,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      addressIsDefault,
      selectedUserAddress,
      isOpen: openedSection === 'address'
    }

    return (
      <FormSections
        toUserSection={toUserSection}
        toAddressSection={toAddressSection}
      />
    );
  }

  _renderSummary() {
    return  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at felis aliquam quam maximus rhoncus. Maecenas sodales leo eu ante ultricies gravida. Etiam dignissim rhoncus mollis. Nam a lacus euismod, tempus dolor sit amet, gravida tellus. Vivamus gravida, dolor vitae porta cursus, felis ligula ultricies ante, eu tempor arcu nunc id orci. Vivamus gravida mollis sem et tincidunt. Aliquam tincidunt neque a elit molestie tincidunt.
    </div>;
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
  selectedUserAddress: state.userAddresses.selected
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Checkout);