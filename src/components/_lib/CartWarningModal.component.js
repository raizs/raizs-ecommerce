import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles, Icon, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import { Modal } from '..';

import {
  closeCartWarningModalAction,
  updateCartAction,
  updateSubscriptionCartAction,
  selectDateAction
} from '../../store/actions';

const actions = {
  closeCartWarningModalAction,
  updateCartAction,
  updateSubscriptionCartAction,
  selectDateAction
};

const styles = theme => ({
  wrapper: {
    userSelect: 'none',
    '& > h2': {
      textAlign: 'center',
      marginBottom: 2 * theme.spacing.unit
    },
    '& > h6': {
      textAlign: 'center',
      marginBottom: 2 * theme.spacing.unit,
      color: theme.palette.gray.main,
      fontSize: theme.fontSizes.SM,
      fontWeight: 500,
      lineHeight: '16px'
    },
    '& h4': {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    '& button': {
      ...theme.buttons.primary,
      marginTop: 4 * theme.spacing.unit,
      fontSize: theme.fontSizes.LG,
      display: 'inline-block'
    },
    '& table': {
      width: '100%',
      tableLayout: 'fixed',
      '& td, & th': {
        padding: theme.spacing.unit,
        '&.date': {
          color: theme.palette.gray.main
        },
        '& p.micro': {
          fontSize: theme.fontSizes.XS
        },
        '& div.card': {
          padding: theme.spacing.unit,
          borderRadius: theme.spacing.unit,
          border: `1px solid ${theme.palette.gray.border}`,
          '& > *': {
            display: 'inline-block',
            verticalAlign: 'top'
          },
          '& > div': {
            marginLeft: theme.spacing.unit,
            maxWidth: 'calc(100% - 48px)'
          },
          '& p.name': {
            ...theme.typography.textEllipsis,
            maxWidth: 'calc(100% - 8px)',
            fontWeight: 500,
            lineHeight: '20px'
          },
          '& p.quantity': {
            color: theme.palette.gray.main,
            fontWeight: 500,
            lineHeight: '20px'
          }
        }
      }
    }
  }
});

const Card = props => {
  const { product, quantity } = props;
  return (
    <div className='card'>
      <img-2
        width={40}
        height={40}
        alt={product.name}
        src={product.imageUrl}
        src-preview={product.imageUrl}
        >
      </img-2>
      <div>
        <p className='name' title={product.name}>
          {product.name}
        </p>
        <p className='quantity'>
          Quantitdade: {quantity}
        </p>
      </div>
    </div>
  );
}

class CartWarningModal extends Component {

  _handleSubmit() {
    const {
      updateCartAction,
      updateSubscriptionCartAction,
      cartWarningModal,
      selectDateAction,
      closeCartWarningModalAction
    } = this.props;
    const { newCart, newSubscriptionCart, selectedDate } = cartWarningModal;

    if(newCart) updateCartAction(newCart);
    if(newSubscriptionCart) updateSubscriptionCartAction(newSubscriptionCart);
    selectDateAction(selectedDate);
    closeCartWarningModalAction();
  }

  _renderRows(items) {
    const renderDiffText = (type, diff) => {
      if(type === 'remove') return 'Item indisponível para data escolhida';
      else return `${diff} ite${diff > 1 ? 'ns' : 'm'} ser${diff > 1 ? 'ão' : 'á'} removido${diff > 1 ? 's' : ''}`
    }

    return items.map(item => (
      <tr>
        <td><Card product={item.product} quantity={item.oldQuantity} /></td>
        <td style={{ textAlign: 'center' }}>
          <Icon>arrow_right_alt</Icon>
          <p className='micro'>{renderDiffText(item.type, item.difference)}</p>
        </td>
        <td><Card product={item.product} quantity={item.newQuantity}/></td>
      </tr>
    ))
  }

  _renderCartDiffs() {
    const { cartInfo, oldDate, newDate } = this.props.cartWarningModal;

    return cartInfo.length ? (
      <div>
        <h4>Pedido avulso</h4>
        <table>
          <thead>
            <tr>
              <th className='date'>{oldDate.date}</th>
              <th><Icon>arrow_right_alt</Icon></th>
              <th className='date'>{newDate.date}</th>
            </tr>
          </thead>
          <tbody>
            {this._renderRows(cartInfo)}
          </tbody>
        </table>
      </div>
    ) : null;
  }

  _renderSubscriptionCartDiffs() {
    const { subscriptionName } = this.props;
    const { subscriptionCartInfo, oldDate, newDate } = this.props.cartWarningModal;

    return subscriptionCartInfo.length ? (
      <div>
        <h4>Assinatura - {subscriptionName}</h4>
        <table>
          <thead>
            <tr>
              <th className='date'>{oldDate.date}</th>
              <th><Icon>arrow_right_alt</Icon></th>
              <th className='date'>{newDate.date}</th>
            </tr>
          </thead>
          <tbody>
            {this._renderRows(subscriptionCartInfo)}
          </tbody>
        </table>
      </div>
    ) : null;
  }

  render() {
    const { classes, cartWarningModal, closeCartWarningModalAction } = this.props;
    const { isOpen } = cartWarningModal;

    return (
      <Modal open={isOpen} width='1024px' handleClose={closeCartWarningModalAction}>
        <div className={classes.wrapper}>
          <h2>Atenção</h2>
          <h6>Um ou mais ítens do seu carrinho serão afetados pela mudança de data devido à disponibilidade do(s) mesmo(s) em nosso estoque.<br/>Confira abaixo se deseja prosseguir com a alteração.</h6>
          {this._renderCartDiffs()}
          {this._renderSubscriptionCartDiffs()}
          <div style={{ textAlign: 'center' }}>
            <Button
              id='confirmDateChange'
              onClick={this._handleSubmit.bind(this)}
            >
              Confirmar mudança de data
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = state => ({
  cartWarningModal: state.cartWarningModal,
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart.current,
  subscriptionName: state.subscriptionCart.subscriptionName,
});

CartWarningModal = compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
)(CartWarningModal);

export { CartWarningModal };
