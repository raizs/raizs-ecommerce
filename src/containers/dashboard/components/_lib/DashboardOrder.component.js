import React, { Component } from 'react';
import { withStyles, Icon, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { selectSaleOrderAction, updateCartAction, showConfirmationModalAction } from '../../../../store/actions';
import { Formatter, CartHelper } from '../../../../helpers';
import { CartProduct } from '../../../../components';
import { toast } from 'react-toastify';

const actions = { selectSaleOrderAction, updateCartAction, showConfirmationModalAction };

const styles = theme => ({
  wrapper: {
    display: "inline-block",
    width: "100%",
    padding: 5 * theme.spacing.unit,
    position: 'relative',
    verticalAlign: "top",
    '& > h1': {
      ...theme.typography.bigTitle,
    },
    '& > span': {
      cursor: 'pointer',
      position: 'absolute',
      top: 5 * theme.spacing.unit,
      left: 5 * theme.spacing.unit,
      verticalAlign: 'middle',
      fontWeight: 700,
      '& > span': {
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      '&:hover, &:hover *': { color: theme.palette.green.main }
    },
    '& > div.summary': {
      marginTop: 4 * theme.spacing.unit,
      '& > div': {
        display: 'inline-block',
        width: '20%',
        padding: theme.spacing.unit,
        verticalAlign: 'top',
        '& > p': {
          fontSize: theme.fontSizes.SM,
          lineHeight: theme.fontSizes.MD,
          '& + p': {
            marginTop: theme.spacing.unit
          }
        },
        '& > p.bold': {
          fontWeight: 700
        },
        '& > p.semibold': {
          fontWeight: 600
        },
        '& > p.green': {
          color: theme.palette.green.main,
        },
        '& > p.gray': {
          color: theme.palette.gray.main,
        },
        '& > p.xs': {
          fontSize: theme.fontSizes.XS
        },
        '& > p.xxs': {
          fontSize: theme.fontSizes.XXS
        },
        '& > p.details': {
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: theme.fontSizes.SM,
          display: 'inline-block',
          float: 'right',
          fontWeight: 700,
          '&:hover': {
            color: theme.palette.green.main
          }
        },
        '& > button#rebuy': {
          ...theme.buttons.secondary,
          width: '100%',
          fontSize: theme.fontSizes.XSM,
          lineHeight: '16px'
        },
        '& > button#cancel': {
          ...theme.buttons.error,
          width: '100%',
          fontSize: theme.fontSizes.XSM,
          lineHeight: '16px',
          marginTop: theme.spacing.unit
        }
      }
    }
  }
});

class DashboardOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cart: null
    }
  }

  componentWillMount() {
    const { saleOrder, products } = this.props;
    if(saleOrder && products && products.all.length) {
      const { lines } = saleOrder;
      const cart = CartHelper.createCartFromLines({ products, lines });
      this.setState({ loading: false, cart });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      saleOrder,
      saleOrders,
      products,
      match: { params: { id } },
      selectSaleOrderAction
    } = nextProps;
    const prevSaleOrder = this.props.saleOrder;
    if(!id) return history.push('/painel/pedidos');

    else if(saleOrders && products && products.all.length) {
      if(!saleOrder) {
        const so = saleOrders.getById(+id);
        if(so) {
          const cart = CartHelper.createCartFromLines({ products, lines: so.lines });
          this.setState({ cart, loading: false });
          selectSaleOrderAction(so);
        }
        else return history.push('/painel/pedidos');
      }
      else if(saleOrder && !prevSaleOrder) this.setState({ loading: false });
    }
  }

  _renderCartItems() {
    const { cart } = this.state;
    // const { handleUpdateCart } = this.controller;

    return cart.items.length ? (
      <div style={{ marginTop: '32px' }}>
        {cart.items.map(item => {
          const { product } = item;

          product.quantity = cart.productQuantities[product.id] || 0;
          product.partialPrice = cart.productPartialPrices[product.id] || 0;

          return (
            <CartProduct
              key={product.id}
              product={product}
              handleUpdateCart={() => null}
              stockQuantity={10}
              disabled
            />
          );
        })}
      </div>
    ) : null;
  }

  _renderSummary() {
    const {
      saleOrder, 
      stockDate,
      products,
      history,
      updateCartAction,
      showConfirmationModalAction,
      saleOrder: {
        amountTotal,
        shippingTimeRange,
        stateString,
        shippingEstimatedDate,
        shippingEstimatedWeekDay
      }
    } = this.props

    const _handleRebuyClick = saleOrder => {
      if(saleOrder && products) {
        const { lines } = saleOrder;
        const { cart, hasModifications } = CartHelper.createCartFromLinesWithStock({ products, lines, stockDate });

        if(cart) {
          updateCartAction(cart);
          history.push('/carrinho');
          if(hasModifications) toast('Um ou mais itens do seu pedido foram alterados devido à disponibilidade em nosso estoque para a data escolhida.', { autoClose: 8000 });
        } else {
          toast('Não é possível refazer o seu pedido pois nenhum dos tens deste pedido está disponível para a data de entrega escolhida. Tente mudar a data de entrega.', { autoClose: 8000 });
        }
      }
    }

    const _handleCancelClick = saleOrder => {
      showConfirmationModalAction({
        title: 'Atenção',
        msg: 'Tem certeza que quer cancelar este pedido?',
        callback: () => {
          if(saleOrder) {
            console.log('todo')
          }
        },
        confirmationLabel: 'Sim, tenho certeza.'
      })
    }

    return (
      <div className='summary'>
        <div>
          <p className='green bold xs'>STATUS</p>
          <p className='bold'>{stateString}</p>
        </div>
        <div>
          <p className='green bold xs'>ENTREGA</p>
          <p className='bold md'>{shippingEstimatedDate}</p>
          <p className='semibold gray xs'>{shippingEstimatedWeekDay}</p>
          <p className='bold xxs' style={{ marginTop: '16px' }}>PREVISÃO DE ENTREGA</p>
          <p className='semibold gray xs'>{shippingTimeRange}</p>
        </div>
        <div>
          <p className='green bold xs'>VALOR</p>
          <p className='bold md'>{Formatter.currency(amountTotal)}</p>
        </div>
        <div></div>
        <div>
          <Button id='rebuy' onClick={() => _handleRebuyClick(saleOrder)}>Refazer pedido</Button>
          <Button id='cancel' onClick={() => _handleCancelClick(saleOrder)}>Cancelar pedido</Button>
        </div>
      </div>
    );
  }

  render() {
    const { classes, saleOrder, history } = this.props;

    if(this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading />
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1>Pedido {saleOrder ? saleOrder.name : ''}</h1>
        <span onClick={() => history.push('/painel/pedidos')}><Icon>keyboard_arrow_left</Icon>Voltar</span>
        {saleOrder && this._renderSummary()}
        {this.state.cart && this._renderCartItems()}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  saleOrder: state.saleOrders.current,
  products: state.products.model,
  stockDate: state.datePicker.obj.stockDate
});

DashboardOrder = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(DashboardOrder);

export { DashboardOrder }