import React, { Component } from 'react'
import { withStyles, LinearProgress, Button } from '@material-ui/core';

import styles from './styles/cartCheckout.styles'
import { Formatter } from '../../../../helpers';
import classnames from 'classnames';


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
    const {
      classes,
      cart,
      cep,
      cepSuccess,
      cepError,
      handleChange,
      handleCepBlur
    } = this.props;

    return cepSuccess ? (
      <div className={classes.cepSuccess}>
        <div className={classes.value}>CEP: <span className={classes.greenCep}>{cep}</span></div>
        <div
          className={classes.info}
          style={{ margin: '16px 0' }}
        >
          Faltam apenas {Formatter.currency(200 - cart.subtotal)} para Frete Grátis.
        </div>
        <LinearProgress variant="determinate" value={100 * cart.subtotal/200} />
      </div>
    ) : (
      <div>
        <input
          id='cep'
          value={cep}
          placeholder='CEP'
          className={classes.input}
          onChange={handleChange}
          onBlur={handleCepBlur}
        />
        <div className={classes.errorText}>{cepError}</div>
      </div>
    )
  }

  _renderCouponField() {
    const { classes, coupon, handleChange } = this.props;

    return (
      <div style={{ marginTop: '16px' }}>
        <p className={classes.label}>CUPOM DE DESCONTO</p>
        <input
          id='coupon'
          value={coupon}
          placeholder='Digite o cupom'
          className={classes.input}
          onChange={handleChange}
        />
        <div className={classes.errorText}>{''}</div>
      </div>
    )
  }

  _renderCheckoutButton() {
    const { classes, subtotalError } = this.props;

    return subtotalError ? (
      <Button className={classes.errorButton}>Adicione mais produtos</Button>
    ) : (
      <Button className={classes.successButton}>CHECKOUT</Button>
    );
  }

  render() {
    const { classes, cart, subtotalError, shippingValue, MINIMUM_VALUE } = this.props;

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
                {Formatter.currency(cart.subtotal)}
              </p>
              <p className={classes.info}>Valor mínimo: {Formatter.currency(MINIMUM_VALUE)}</p>
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