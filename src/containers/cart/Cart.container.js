import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import { CartController } from './Cart.controller';
import { BaseContainer } from '../../helpers';
import {
  updateCartAction,
  updateSubscriptionCartAction,
  selectDateAction,
  removeSubscriptionCartAction
} from '../../store/actions';
import { CartProduct, SubscriptionCartProduct, BigDatePicker } from '../../components';
import { CartCheckout } from './components';
import { SubscriptionCart } from '../../entities';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none',
    width: '100%',
    padding: 3 * theme.spacing.unit,
    '& > h1': theme.typography.raizs,
    '& > div.date-picker-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 2 * theme.spacing.unit,
      marginTop: 2 * theme.spacing.unit
    },
    '& > div.items': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 4 * theme.spacing.unit,
      '& > h4': {
        fontSize: theme.fontSizes.LG,
        fontWeight: 700,
        margin: `${2 * theme.spacing.unit}px 0`,
        textAlign: 'left',
        width: '100%',
        maxWidth: '1100px',
        display: 'inline-block',
        '& > span': {
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: theme.fontSizes.SM,
          display: 'inline-block',
          float: 'right',
          fontWeight: 600,
          '&:hover': {
            color: theme.palette.green.main
          }
        }
      },
      '& > div': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    '& > .checkout': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 4 * theme.spacing.unit
    }
  }
});

const actions = {
  updateCartAction,
  updateSubscriptionCartAction,
  removeSubscriptionCartAction,
  selectDateAction
};

const MINIMUM_VALUE = 60; // todo: get from db
const FREE_SHIPPING_VALUE = 200; // todo: get from db

/**
 * Cart - Container 'Carrinho'
 *
 * @export
 * @class Cart
 * @extends {BaseContainer}
 */
class Cart extends BaseContainer {
  constructor(props) {
    super(props, CartController);
  }

  state = {
    cep: '',
    coupon: '',
    shippingValue: null,
    
    cepLoading: false,
    cepSuccess: false,
    cepError: false,
    subtotalError: true
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    const { cart, subscriptionCart } = this.props;
    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    const subtotal = cart.subtotal + sCart.subtotal;
    if(cart && sCart && subtotal >= MINIMUM_VALUE) this.setState({ subtotalError: false });
  }
  
  componentWillReceiveProps(nextProps) {
    const { cart, subscriptionCart } = nextProps;
    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    const subtotal = cart.subtotal + sCart.subtotal;

    if(subtotal < MINIMUM_VALUE && !this.state.subtotalError)
    this.setState({ subtotalError: true });
    
    if(subtotal >= MINIMUM_VALUE && this.state.subtotalError)
    this.setState({ subtotalError: false });
  }

  _renderCartItems() {
    const { cart } = this.props;
    const { handleUpdateCart } = this.controller;

    return cart.items.length ? (
      <div className='items'>
        <h4>Pedido Avulso</h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;

            return <CartProduct key={product.id} product={product} handleUpdateCart={handleUpdateCart} />;
          })}
        </div>
      </div>
    ) : null;
  }

  _renderSubscriptionCartItems() {
    const { subscriptionCart } = this.props;
    const { handleUpdateSubscriptionCart, handleRemoveSubscription } = this.controller;
    const cart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    const { subscriptionName } = subscriptionCart;

    return cart.items.length ? (
      <div className='items'>
        <h4>
          Assinatura - {subscriptionName}
          <span onClick={handleRemoveSubscription}>remover</span>
        </h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;
            product.periodicity = item.periodicity || 'weekly';
            product.secondaryPeriodicity = item.secondaryPeriodicity || 'first';

            return <SubscriptionCartProduct key={product.id} product={product} handleUpdateCart={handleUpdateSubscriptionCart} />;
          })}
        </div>
      </div>
    ) : null;
  }

  render() {
    const { classes, cart, history, subscriptionCart, selectedDate, selectDateAction } = this.props;
    const { cep, coupon, cepLoading, cepSuccess, cepError, subtotalError, shippingValue } = this.state;
    const { handleChange, handleCepBlur } = this.controller;

    const toCartCheckout = {
      history,
      cart,
      subscriptionCart,
      cep,
      coupon,
      cepLoading,
      cepSuccess,
      cepError,
      subtotalError,
      handleChange,
      handleCepBlur,
      shippingValue,

      MINIMUM_VALUE, // todo: get from db
      FREE_SHIPPING_VALUE // todo: get from db
    };

    return (
      <div className={classes.wrapper}>
        <h1>SEU CARRINHO</h1>
        <div className='date-picker-wrapper'>
          <BigDatePicker handleSelectDate={selectDateAction} selected={selectedDate} />
        </div>
        {this._renderCartItems()}
        {this._renderSubscriptionCartItems()}
        <div className='checkout'>
          <CartCheckout {...toCartCheckout} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart,
  selectedDate: state.datePicker.selected
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Cart);