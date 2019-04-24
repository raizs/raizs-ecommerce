import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import { CartController } from './Cart.controller';
import { BaseContainer } from '../../helpers';
import styles from './cart.styles';

import {
  updateCartAction
} from '../../store/actions';
import { CartProduct, CartCheckout } from './components';

const actions = {
  updateCartAction
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
    if(this.props.cart && this.props.cart.subtotal >= MINIMUM_VALUE) this.setState({ subtotalError: false });
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.cart.subtotal < MINIMUM_VALUE && !this.state.subtotalError)
    this.setState({ subtotalError: true });
    
    if(nextProps.cart.subtotal >= MINIMUM_VALUE && this.state.subtotalError)
    this.setState({ subtotalError: false });
  }

  _renderItems() {
    const { cart } = this.props;
    const { handleUpdateCart } = this.controller;

    return cart.items.length ? cart.items.map(item => {
      const { product } = item;

      product.quantity = cart.productQuantities[product.id] || 0;
      product.partialPrice = cart.productPartialPrices[product.id] || 0;

      return <CartProduct key={product.id} product={product} handleUpdateCart={handleUpdateCart} />;
    }) :
    <div>Não há itens em seu carrinho.</div>;
  }

  render() {
    const { classes, cart, history } = this.props;
    const { cep, coupon, cepLoading, cepSuccess, cepError, subtotalError, shippingValue } = this.state;
    const { handleChange, handleCepBlur } = this.controller;

    const toCartCheckout = {
      history,
      cart,
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
        <h1 className={classes.title}>
          SEU CARRINHO
        </h1>
        <div className={classes.items}>
          {this._renderItems()}
        </div>
        <div className={classes.checkout}>
          <CartCheckout {...toCartCheckout} />
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
)(Cart);