import React, { Component } from 'react'
import classnames from 'classnames';
import { withStyles, LinearProgress, Button, Select, MenuItem } from '@material-ui/core';

import { Formatter } from '../../../../helpers';
import { Loading, TextInput } from '../../../../molecules';
import { SubscriptionCart } from '../../../../entities';

const styles = theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  box: {
    width: '100%',
    maxWidth: '360px'
  },
  subtotalAndMinimumValue: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  label: {
    fontSize: theme.fontSizes.XS,
    fontWeight: 600
  },
  value: {
    color: theme.palette.gray.main,
    fontWeight: 500,
    '&.error': {
      color: theme.palette.red
    }
  },
  info: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500
  },
  cepSuccess: {
    marginTop: theme.spacing.unit
  },
  greenCep: {
    color: theme.palette.green.main,
    textDecoration: 'underline'
  },
  errorText: {
    color: theme.palette.red,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500,
    marginTop: theme.spacing.unit / 2
  },
  shipping: {
    marginTop: 3 * theme.spacing.unit
  },
  textInput: {
    ...theme.inputs.text,
    marginTop: 2 * theme.spacing.unit
  },
  successButton: {
    ...theme.buttons.primary,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  },
  errorButton: {
    ...theme.buttons.error,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  }
});

class CartCheckout extends Component {
  _renderShippingAndCoupons() {
    const { classes, subtotalError, shippingValue } = this.props;

    if(subtotalError) return;

    return (
      <div>
        <div className={classes.shipping}>
          <div>
            <p
              className={classes.label}
              style={{ display: 'inline-block' }}
            >
              FRETE
            </p>
            <p
              className={classes.value}
              style={{ display: 'inline-block', float: 'right' }}
            >
              {Formatter.currency(shippingValue)}
            </p>
          </div>
          {this._renderCepField()}
        </div>
        {this._renderCouponField()}
      </div>
    );
  }

  _renderCepField() {
    let {
      user,
      classes,
      cart,
      subscriptionCart,
      selectedAddress,
      selectUserAddressAction,
      cep,
      cepSuccess,
      cepError,
      handleChange,
      handleCepBlur,
      cepLoading,
      FREE_SHIPPING_VALUE
    } = this.props;

    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    const subtotal = cart.subtotal + sCart.subtotal;

    if(user && user.addresses.all.length) {
      return (
        <div style={{ marginTop: '16px' }}>
          <Select
            style={{ width: '160px' }}
            value={selectedAddress}
            onChange={e => selectUserAddressAction(e.target.value)}
          >
            {user.addresses.all.map(address => 
              <MenuItem value={address}>{address.name}</MenuItem>
            )}
          </Select>
          <div
            className={classes.info}
            style={{ margin: '16px 0' }}
          >
            Faltam apenas {Formatter.currency(FREE_SHIPPING_VALUE - subtotal)} para Frete Grátis.
          </div>
          <LinearProgress variant="determinate" value={100 * subtotal/FREE_SHIPPING_VALUE} />
        </div>
      )
    }

    return cepSuccess ? (
      <div className={classes.cepSuccess}>
        <div className={classes.value}>CEP: <span className={classes.greenCep}>{cep}</span></div>
        <div
          className={classes.info}
          style={{ margin: '16px 0' }}
        >
          Faltam apenas {Formatter.currency(FREE_SHIPPING_VALUE - subtotal)} para Frete Grátis.
        </div>
        <LinearProgress variant="determinate" value={100 * subtotal/FREE_SHIPPING_VALUE} />
      </div>
    ) : (
      <div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <TextInput
            id='cep'
            value={cep}
            placeholder='CEP'
            className={classes.textInput}
            handleChange={handleChange}
            handleBlur={handleCepBlur}
            disabled={cepLoading}
          />
        </div>
        { cepLoading ? <Loading inline size={20} /> : null }
        <div className={classes.errorText}>{cepError}</div>
      </div>
    )
  }

  _renderCouponField() {
    const { classes, coupon, handleChange } = this.props;

    return (
      <div style={{ marginTop: '16px' }}>
        <p className={classes.label}>CUPOM DE DESCONTO</p>
        <TextInput
          id='coupon'
          value={coupon}
          placeholder='Digite o cupom'
          className={classes.textInput}
          onChange={handleChange}
        />
        <div className={classes.errorText}>{''}</div>
      </div>
    )
  }

  _renderCheckoutButton() {
    const { classes, subtotalError, history } = this.props;

    return subtotalError ? (
      <Button onClick={() => history.push('catalogo')} className={classes.errorButton}>Adicione mais produtos</Button>
    ) : (
      <Button onClick={() => history.push('checkout')} className={classes.successButton}>CHECKOUT</Button>
    );
  }

  render() {
    const { classes, cart, subscriptionCart, subtotalError, MINIMUM_VALUE } = this.props;
    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    const subtotal = cart.subtotal + sCart.subtotal;

    const valueClasses = [classes.value];
    if(subtotalError) valueClasses.push('error');

    return (
      <div className={classes.wrapper}>
        <div className={classes.box}>
          <div className={classes.subtotalAndMinimumValue}>
            <p className={classes.label}>SUB TOTAL</p>
            <div>
              <p
                className={classnames(...valueClasses)}
                style={{ marginBottom: '8px' }}
              >
                {Formatter.currency(subtotal)}
              </p>
              {/* <p className={classes.info}>Valor mínimo: {Formatter.currency(MINIMUM_VALUE)}</p> */}
            </div>
          </div>
          {this._renderShippingAndCoupons()}
          {this._renderCheckoutButton()}
        </div>
      </div>
    )
  }
}

CartCheckout = withStyles(styles)(CartCheckout);

export { CartCheckout };