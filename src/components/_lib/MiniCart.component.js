import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { withStyles, Button, Icon, Select, MenuItem, LinearProgress } from '@material-ui/core';

import { MiniDatePicker, Coupon } from '../../molecules';
import { MiniCartProduct } from './MiniCartProduct.component';
import { MiniSubscriptionCartProduct } from './MiniSubscriptionCartProduct.component';
import { SubscriptionCart } from '../../entities';
import { setMiniCartSectionAction, selectUserAddressAction, selectCardAction } from '../../store/actions';
import { Formatter } from '../../helpers';

const actions = { setMiniCartSectionAction, selectUserAddressAction, selectCardAction };

const TOP_HEIGHT = 40;
const BOTTOM_HEIGHT = 160;

const styles = theme => ({
  wrapper: {
    width: '420px',
    maxHeight: window.innerHeight - 160,
    overflow: 'hidden',
    userSelect: 'none',
    
    '& > div.top': {
      backgroundColor: theme.palette.green.light,
      padding: theme.spacing.unit,
      fontWeight: 700,
      position: 'relative',
      textAlign: 'center',
      height: TOP_HEIGHT,
      borderTopRightRadius: theme.spacing.unit,
      borderTopLeftRadius: theme.spacing.unit,
      '& > div': {
        color: 'white',
        display: 'inline-block',
        lineHeight: '24px',
        '& > span': {
          position: 'absolute',
          left: '8px',
          top: '8px',
          cursor: 'pointer',
          color: 'white',
          '& > span': {
            verticalAlign: 'middle',
            color: 'white'
          }
        }
      }
    },
    
    '& > div.content': {
      backgroundColor: theme.palette.gray.bg,
      padding: theme.spacing.unit,
      textAlign: 'center',
      overflowY: 'auto',
      maxHeight: window.innerHeight - 200 - TOP_HEIGHT - BOTTOM_HEIGHT,
      width: '100%',    
      '& > div.items': {
        maxWidth: '100%'
      },
      '& > div > h6': {
        fontSize: theme.fontSizes.SM,
        color: theme.palette.green.main,
        fontWeight: 700,
        textAlign: 'left'
      },
      '& > div > div.box': {
        textAlign: 'left',
        fontSize: theme.fontSizes.MD,
        fontWeight: 700,
        padding: theme.spacing.unit,
        backgroundColor: 'white',
        borderRadius: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        '& > div.address-summary': {
          paddingLeft: '16px',
          display: 'inline-block',
          width: '60%',
          '& > p': {
            fontSize: theme.fontSizes.SM,
            lineHeight: '16px',
            fontWeight: 500,
            color: theme.palette.gray.main
          }
        }
      }
    },

    '& > div.bottom': {
      backgroundColor: theme.palette.gray.darkBg,
      padding: theme.spacing.unit,
      textAlign: 'center',
      height: BOTTOM_HEIGHT,
      zIndex: 11,
      borderBottomRightRadius: theme.spacing.unit,
      borderBottomLeftRadius: theme.spacing.unit,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& > div': {
        display: 'inline-block'
      },
      '& > div.subtotal': {
        display: 'flex',
        justifyContent: 'space-between',
        margin: `${theme.spacing.unit}px 0`,
        fontSize: theme.fontSizes.MD,
        '& > span': {
          color: theme.palette.green.main,
          cursor: 'pointer',
          fontWeight: 700,
          '&:hover': {
            textDecoration: 'underline'
          }
        },
        '& p': {
          display: 'inline-block',
          '&.bold': {
            fontWeight: 700
          },
          '&.-ml': {
            marginLeft: 2 * theme.spacing.unit
          }
        }
      },
      '& > button': {
        ...theme.buttons.primary,
        fontSize: theme.fontSizes.MMD,
        width: '100%'
      }
    },
  },
});

class MiniCart extends Component {

  state = {
    currentSection: 'cart'
  }

  componentDidMount() {
    if(this.props.currentMiniCartSection !== this.state.currentSection)
      this.setState({ currentSection: this.props.currentMiniCartSection });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentMiniCartSection !== this.state.currentSection)
      this.setState({ currentSection: nextProps.currentMiniCartSection });
  }
  
  _renderTop() {
    const { handleSelectDate, selectedDate, setMiniCartSectionAction } = this.props;
    const { currentSection } = this.state;

    if(currentSection === 'cart')
      return (
        <div className='top'>
          <MiniDatePicker
            zIndex={12}
            handleSelectDate={handleSelectDate}
            selected={selectedDate}
          />
        </div>
      );
    
    else if(currentSection === 'checkout')
      return (
        <div className='top'>
          <div>
            <span onClick={() => setMiniCartSectionAction('cart')}>
              <Icon>keyboard_arrow_left</Icon>voltar
            </span>
            CHECKOUT
          </div>
        </div>
      );

    return null;
  }

  _renderContent() {
    const { currentSection } = this.state;

    if(currentSection === 'cart')
      return (
        <div className='content -cart'>
          {this._renderCart()}
          {this._renderSubscriptionCart()}
        </div>
      );

    else if(currentSection === 'checkout')
      return (
        <div className='content -checkout'>
          {this._renderCheckout()}
        </div>
      );

    return null;
  }

  _renderBottom() {
    const { setMiniCartSectionAction, cart, subscriptionCart, isSubscriptionAdded, history } = this.props;
    const { currentSection } = this.state;

    let subtotal = cart.subtotal;
    if(isSubscriptionAdded) subtotal += subscriptionCart.subtotal;

    if(currentSection === 'cart')
      return (
        <div className='bottom -cart'>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: '8px 0' }}>Faltam apenas {Formatter.currency(220 - subtotal)} para frete grátis!</p>
            <LinearProgress variant='determinate' value={subtotal/220 * 100} />
          </div>
          <div className='subtotal'>
            <span onClick={() => history.push('/carrinho')}>Revisar carrinho</span>
            <div>
              <p>Subtotal</p>
              <p className='bold -ml'>{Formatter.currency(subtotal)}</p>
            </div>
          </div>
          <Button
            id='fastCheckout'
            onClick={() => setMiniCartSectionAction('checkout')}
          >
            Checkout Rápido
          </Button>
        </div>
      );
    
    else if(currentSection === 'checkout')
      return (
        <div className='bottom -checkout'>
          <div className='subtotal'>
            <p>Frete</p>
            <p>{Formatter.currency(9.9)}</p>
          </div>
          <div className='subtotal'>
            <p className='bold'>Total</p>
            <p className='bold'>{Formatter.currency(subtotal + 9.9)}</p>
          </div>
          <Button
            id='finishFastCheckout'
            onClick={() => console.log('fast checkout! wow!')}
          >
            Finalizar Compra
          </Button>
        </div>
      );

    return null;
  }

  _renderCart() {
    const { cart, handleUpdateCart, dateObj } = this.props;

    return cart.items.length ? (
      <div className='items'>
        <h4 style={{ textAlign: 'left', marginBottom: '8px' }}>Pedido Avulso</h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;

            return (
              <MiniCartProduct
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateCart}
                stockQuantity={product.stock ? product.stock[dateObj.stockDate] : 0}
              />
            );
          })}
        </div>
      </div>
    ) : null;
  }

  _renderSubscriptionCart() {
    const {
      subscriptionCart,
      subscriptionName,
      isSubscriptionAdded,
      handleUpdateSubscriptionCart,
      dateObj
    } = this.props;
    const cart = isSubscriptionAdded ? subscriptionCart : new SubscriptionCart({});

    return cart.items.length ? (
      <div className='items'>
        <h4 style={{ textAlign: 'left', marginBottom: '8px' }}>
          Assinatura - {subscriptionName}
        </h4>
        <div>
          {cart.items.map(item => {
            const { product } = item;

            product.quantity = cart.productQuantities[product.id] || 0;
            product.partialPrice = cart.productPartialPrices[product.id] || 0;
            product.periodicity = item.periodicity || 'weekly';
            product.secondaryPeriodicity = item.secondaryPeriodicity || 'first';

            return (
              <MiniSubscriptionCartProduct
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateSubscriptionCart}
                stockQuantity={product.stock ? product.stock[dateObj.stockDate] : 0}
              />
            );
          })}
        </div>
      </div>
    ) : null;
  }

  _renderCheckout() {
    const {
      dateObj,
      selectedAddress,
      selectUserAddressAction,
      user,
      cards,
      selectedCard,
      selectCardAction
    } = this.props;
    return (
      <div>

        <h6>DATA DE ENTREGA</h6>
        <div className='box'>
          {dateObj.date}
        </div>

        <h6>ENDEREÇO DE ENTREGA</h6>
        <div className='box'>
          <Select
            style={{ width: '40%', verticalAlign: 'top' }}
            value={selectedAddress}
            onChange={e => selectUserAddressAction(e.target.value)}
          >
            {user.addresses.all.map(address =>
              <MenuItem value={address}>{address.name}</MenuItem>
            )}
          </Select>
          <div className='address-summary'>
            <p>Para: {selectedAddress ? selectedAddress.receiverName : ''}</p>
            <p>{selectedAddress ? selectedAddress.cep : ''}</p>
            <p>{selectedAddress ? selectedAddress.formattedAddress : ''}</p>
            <p>{selectedAddress ? selectedAddress.formattedAddress2 : ''}</p>
          </div>
        </div>

        <h6>PAGAMENTO</h6>
        <div className='box'>
          <Select
            style={{ width: '70%' }}
            value={selectedCard}
            onChange={e => selectCardAction(e.target.value)}
          >
            {cards.all.map(card =>
              <MenuItem value={card}>{card.finalString}</MenuItem>
            )}
          </Select>
        </div>

        <h6>CRÉDITOS RAÍZS</h6>
        <div className='box'>
          <Coupon />
        </div>

      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {this._renderTop()}
        {this._renderContent()}
        {this._renderBottom()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedDate: state.datePicker.selected,
  selectedAddress: state.userAddresses.selected,
  dateObj: state.datePicker.obj,
  cart: state.cart.current,
  user: state.user.current,
  subscriptionCart: state.subscriptionCart.current,
  subscriptionName: state.subscriptionCart.subscriptionName,
  isSubscriptionAdded: state.subscriptionCart.isAdded,
  currentMiniCartSection: state.miniCart.currentSection,
  cards: state.cards.model,
  selectedCard: state.cards.selected,
});

MiniCart = compose(
  withStyles(styles),
  withRouter,
  connect(
		mapStateToProps,
		actions
  )
)(MiniCart);

export { MiniCart };