import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';
import styles from './checkout.styles';

import { setUserAction } from '../../store/actions';
import { FormSections } from './components';
import { withFirebase } from 'react-redux-firebase';

const actions = {
  setUserAction
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

    addressCep: '',
    addressAddress: '',
    addressNumber: '',
    addressComplement: '',
    addressNeighbourhood: '',
    addressCity: '',
    addressState: '',
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
      handleCheckbox,
      handleGoogleSignin,
      handleCompleteSignup,
      handleEmailAndPasswordLogin,
      handleOpenSection,
      handleCepBlur
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
      addressState
    } = this.state;

    const { user } = this.props;

    const toUserSection = {
      user,
      userSectionLoading,
      handleChange,
      handleCheckbox,
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
      addressSectionLoading,
      handleChange,
      handleCepBlur,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      isOpen: openedSection === 'address'
    }

    return (
      <FormSections toUserSection={toUserSection} toAddressSection={toAddressSection} />
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
  user: state.user.current
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Checkout);