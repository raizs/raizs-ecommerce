import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';

import { CheckoutController } from './Checkout.controller';
import { BaseContainer } from '../../helpers';
import styles from './checkout.styles';

import {} from '../../store/actions';
import { InfoSections } from './components';

const actions = {
  // updateCheckoutAction
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
    loginEmailOrCellphone: '',
    loginPassword: '',

    signupName: '',
    signupLastName: '',
    signupCpf: '',
    signupEmail: '',
    signupCellphone: '',
    signupPassword: '',
    signupNews: false
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  _renderInfo() {
    const { handleChange, handleCheckbox } = this.controller;
    const {
      loginEmailOrCellphone,
      loginPassword,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews
    } = this.state;

    const toUserSection = {
      handleChange,
      handleCheckbox,
      loginEmailOrCellphone,
      loginPassword,
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword,
      signupNews
    };

    return (
      <InfoSections toUserSection={toUserSection} />
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
  cart: state.cart.current
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Checkout);