import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import { SubscriptionCartProduct, CartCheckout } from '../../../../components';

const styles = theme => ({
  wrapper: {
    userSelect: 'none',
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    padding: 3 * theme.spacing.unit,
    paddingBottom: 12 * theme.spacing.unit,
    minHeight: window.innerHeight - 64
  },
  title: theme.typography.raizs,
  items: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4 * theme.spacing.unit
  },
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4 * theme.spacing.unit
  }
});

const MINIMUM_VALUE = 60; // todo: get from db
const FREE_SHIPPING_VALUE = 200; // todo: get from db

class Review extends Component {

  state = {
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
    const { cart, handleUpdateCart, stockDate } = this.props;

    return cart.items.length ? cart.items.map(item => {
      const { product } = item;

      product.quantity = cart.productQuantities[product.id] || 0;
      product.partialPrice = cart.productPartialPrices[product.id] || 0;
      product.periodicity = item.periodicity || 'weekly';
      product.secondaryPeriodicity = item.secondaryPeriodicity || 'first';

      return (
        <SubscriptionCartProduct
          key={product.id}
          product={product}
          handleUpdateCart={handleUpdateCart}
          stockQuantity={product.stock ? product.stock[stockDate] : 0}
        />
      );
    }) :
    <div>Não há itens em seu carrinho.</div>;
  }

  render() {
    const {
      classes,
      cart,
      history,
      handleChange,
      handleCepBlur,
      cep,
      coupon,
      cepLoading,
      cepSuccess,
      cepError,
      subtotalError,
      shippingValue,
      subscriptionName,
      handleCheckout
    } = this.props;

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
      subscriptionName,
      handleCheckout,

      MINIMUM_VALUE, // todo: get from db
      FREE_SHIPPING_VALUE // todo: get from db
    };

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.title}>
          Confira se está tudo certo
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

Review = withStyles(styles)(Review);
export { Review };