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
    justifyContent: 'flex-end',
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

  _renderShipping() {
    const { classes, subtotalError, transaction } = this.props;
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
              {transaction.totals.toChargeNow.shipping ? Formatter.currency(transaction.totals.toChargeNow.shipping) : "-"}
            </p>
          </div>
          {this._renderCepField()}
        </div>
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
      transaction,
      currentCep
    } = this.props;

    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart({});
    const subtotal = cart.subtotal + sCart.subtotal;

    let shippingData = transaction.calculateShippingProgress(transaction.totals.toChargeNow.total - transaction.totals.toChargeNow.shipping);
    let shouldRenderShippingLeft = shippingData.progress != 100

    if((user && user.addresses.all.length) || currentCep.current ) {
      return (
        <div style={{ marginTop: '16px' }}>
          {Boolean(currentCep.current) || <Select
            style={{ width: '160px' }}
            value={selectedAddress}
            onChange={e => selectUserAddressAction(e.target.value)}
          >
            {user.addresses.all.map(address => 
              <MenuItem value={address}>{address.name}</MenuItem>
            )}
          </Select>}
          {shouldRenderShippingLeft && <span><div
              className={classes.info}
              style={{ margin: '16px 0' }}
            >
              Faltam apenas {Formatter.currency(shippingData.leftValue)} para desconto de R$9.90 no Frete.
            </div>
            <LinearProgress variant="determinate" value={shippingData.progress} />
          </span>
          }
        </div>
      )
    }

    // return cepSuccess ? (
    //   <div className={classes.cepSuccess}>
    //     <div className={classes.value}>CEP: <span className={classes.greenCep}>{cep}</span></div>
    //     <div
    //       className={classes.info}
    //       style={{ margin: '16px 0' }}
    //     >
    //       Faltam apenas {Formatter.currency(10)} para Frete Grátis.
    //     </div>
    //     <LinearProgress variant="determinate" value={80} />
    //   </div>
    // ) : (
    //   <div>
    //     <div style={{ width: '50%', display: 'inline-block' }}>
    //       <TextInput
    //         id='cep'
    //         value={cep}
    //         placeholder='CEP'
    //         className={classes.textInput}
    //         handleChange={handleChange}
    //         handleBlur={handleCepBlur}
    //         disabled={cepLoading}
    //       />
    //     </div>
    //     { cepLoading ? <Loading inline size={20} /> : null }
    //     <div className={classes.errorText}>{cepError}</div>
    //   </div>
    // )
  }

  render() {
    const { classes, cart, subscriptionCart, history } = this.props;
    const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart({});
    const subtotal = cart.subtotal + sCart.subtotal;

    return (
      <div className={classes.wrapper}>
        <div className={classes.box}>
          <div className={classes.subtotalAndMinimumValue}>
            <p className={classes.label}>SUB TOTAL</p>
            <div>
              <p
                className={classes.value}
                style={{ marginBottom: '8px' }}
              >
                {Formatter.currency(subtotal)}
              </p>
            </div>
          </div>
          {this._renderShipping()}
          <Button onClick={() => history.push('checkout')} className={classes.successButton}>CHECKOUT</Button>
        </div>
      </div>
    )
  }
}

CartCheckout = withStyles(styles)(CartCheckout);

export { CartCheckout };