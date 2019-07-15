import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles, Icon } from '@material-ui/core';
import { withCookies } from 'react-cookie';

import { CartController } from './Cart.controller';
import { BaseContainer } from '../../helpers';
import {
  updateCartAction,
  updateSubscriptionCartAction,
  selectDateAction,
  removeSubscriptionCartAction,
  selectUserAddressAction,
  openCartWarningModalAction
} from '../../store/actions';
import {
  CartProduct,
  SubscriptionCartProduct,
  BigDatePicker,
  SimpleCepChecker, 
  CheckoutBar
} from '../../components';
import { CartCheckout } from './components';
import { SubscriptionCart, Transaction } from '../../entities';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none',
    width: '100%',
    padding: 3 * theme.spacing.unit,
    paddingBottom: theme.sizes.CHECKOUT_BAR_HEIGHT + 2*theme.spacing.unit,
    '& > h1': {
      ...theme.typography.raizs,
      marginBottom: 6 * theme.spacing.unit
    },
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
  selectDateAction,
  selectUserAddressAction,
  openCartWarningModalAction
};


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
    shipping: null,
    cepLoading: false,
    cepSuccess: false,
    cepError: false,
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    document.title = 'Raízs | Carrinho';
    // const { cart, subscriptionCart } = this.props;
    // const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    // const subtotal = cart.subtotal + sCart.subtotal;
    // if(cart && sCart && subtotal >= MINIMUM_VALUE) this.setState({ subtotalError: false });

    if(this.props.currentCep) {
      this.setState({
        cepSuccess: true,
        shipping: this.props.currentCep.shipping,
        cep: this.props.currentCep.current
      });
    }
  }
  
  componentWillReceiveProps(nextProps) {
    // const { cart, subscriptionCart } = nextProps;
    // const sCart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart([]);
    // const subtotal = cart.subtotal + sCart.subtotal;

    // if(subtotal < MINIMUM_VALUE && !this.state.subtotalError)
    // this.setState({ subtotalError: true });
    
    // if(subtotal >= MINIMUM_VALUE && this.state.subtotalError)
    // this.setState({ subtotalError: false });

    if(nextProps.currentCep && !this.props.currentCep) {
      this.setState({
        cepSuccess: true,
        shipping: nextProps.currentCep.shipping,
        cep: nextProps.currentCep.current
      });
    }
  }

  _renderCartItems() {
    const { cart, stockDate } = this.props;
    const { handleUpdateCart } = this.controller;

    return cart.items.length ? (
      <div className='items'>
        <h4>Pedido Avulso</h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;

            return (
              <CartProduct
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateCart}
                stockQuantity={product.stock ? product.stock[stockDate] : 0}
              />
            );
          })}
        </div>
      </div>
    ) : null;
  }

  _renderSubscriptionCartItems() {
    const { subscriptionCart, stockDate } = this.props;
    const { handleUpdateSubscriptionCart, handleRemoveSubscription } = this.controller;
    const cart = subscriptionCart.isAdded ? subscriptionCart.current : new SubscriptionCart({});
    const { subscriptionName } = subscriptionCart;

    return cart.items.length ? (
      <div className='items'>
        <h4>
          Assinatura - {subscriptionName}
          <span onClick={handleRemoveSubscription}><Icon>close</Icon></span>
        </h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;
            product.periodicity = item.periodicity || 'weekly';
            product.secondaryPeriodicity = item.secondaryPeriodicity || 'first';

            return (
              <SubscriptionCartProduct
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateSubscriptionCart}
                stockQuantity={product.stock ? product.stock[stockDate] : 0}
                stockDate={stockDate}
              />
            );
          })}
        </div>
      </div>
    ) : null;
  }

  _renderEmptyCart() {
    const { cart, subscriptionCart } = this.props;
    if(!cart.productCount && !subscriptionCart.isAdded)
      return (
        <div style={{ textAlign: 'center' }}>Não há ítens em seu carrinho.</div>
      );
  }

  render() {
    const {
      classes,
      cart,
      selectedAddress,
      history,
      subscriptionCart,
      selectedDate,
      selectUserAddressAction,
      user,
      currentCep,
      giftCard, 
      coupon,
      momentDate,
    } = this.props;
    const { cep, cepLoading, cepSuccess, cepError} = this.state;
    const { handleChange, handleCepBlur, handleSelectDate } = this.controller;

    const transaction = new Transaction({ cart, subcart:subscriptionCart, coupon, giftCard, selectedPaymentMethod:null, momentDate, 
      shipping: currentCep.shipping ? { value: currentCep.shipping[momentDate.format('dddd').split('-')[0]] } : null 
    });

    const toCartCheckout = {
      history,
      cart,
      subscriptionCart,
      currentCep,
      user,
      cep,
      cepLoading,
      cepSuccess,
      cepError,
      handleChange,
      handleCepBlur,
      selectedAddress,
      selectUserAddressAction,
      transaction,
      momentDate
    };

    let shouldRenderDatePicker = (user && user.addresses.all.length) || currentCep.current;
    let shouldRenderCepChecker = !shouldRenderDatePicker;

    return (
      <div className={classes.wrapper}>
        <h1>SEU CARRINHO</h1>
        {shouldRenderDatePicker && <div className='date-picker-wrapper'>
            <BigDatePicker handleSelectDate={handleSelectDate} selected={selectedDate} />
          </div>
        }
        {shouldRenderCepChecker && <div className='cep-wrapper'>
            <SimpleCepChecker />
          </div>
        }
        {this._renderCartItems()}
        {this._renderSubscriptionCartItems()}
        {this._renderEmptyCart()}
        <div className='checkout'>
          <CartCheckout {...toCartCheckout} />
        </div>
        <CheckoutBar transaction={transaction} history={this.props.history}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.current,
  cart: state.cart.current,
  currentCep: state.cep,
  subscriptionCart: state.subscriptionCart,
  selectedDate: state.datePicker.selected,
  stockDate: state.datePicker.obj.stockDate,
  selectedAddress: state.userAddresses.selected,
  momentDate: state.datePicker.momentDate,
  coupon: state.coupon.selected,
  giftCard: state.giftCard,
});


export default compose(
  withCookies,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Cart);