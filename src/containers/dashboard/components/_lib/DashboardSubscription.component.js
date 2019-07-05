import React, { Component } from 'react';
import { withStyles, Icon, Button, Select, MenuItem } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { selectSaleSubscriptionAction } from '../../../../store/actions';
import { Formatter, CartHelper } from '../../../../helpers';
import { SubscriptionCartProduct } from '../../../../components';

const actions = { selectSaleSubscriptionAction };

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

class DashboardSubscription extends Component {
  state = {
    loading: true,
    cart: null
  }

  componentWillMount() {
    const { saleSubscription, products } = this.props;
    if(saleSubscription && products && products.all.length) {
      const { lines } = saleSubscription;
      const cart = CartHelper.createSubscriptionCartFromLines({ products, lines });
      this.setState({ loading: false, cart });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      saleSubscription,
      saleSubscriptions,
      products,
      match: { params: { id } },
      selectSaleSubscriptionAction
    } = nextProps;
    const prevSaleSubscription = this.props.saleSubscription;
    if(!id) return history.push('/painel/assinaturas');

    else if(saleSubscriptions && products && products.all.length) {
      if(!saleSubscription) {
        const so = saleSubscriptions.getById(+id);
        if(so) {
          const cart = CartHelper.createSubscriptionCartFromLines({ products, lines: so.lines });
          this.setState({ cart, loading: false });
          selectSaleSubscriptionAction(so);
        }
        else return history.push('/painel/assinaturas');
      }
      else if(saleSubscription && !prevSaleSubscription) this.setState({ loading: false });
    }
  }

  _renderCartItems() {
    const { cart } = this.state;

    return cart.items.length ? (
      <div style={{ marginTop: '32px' }}>
        {cart.items.map(item => {
          const { product } = item;

          product.quantity = cart.productQuantities[product.id] || 0;
          product.partialPrice = cart.productPartialPrices[product.id] || 0;
          product.periodicity = item.periodicity || 'weekly';
          product.secondaryPeriodicity = item.secondaryPeriodicity || 'first';

          return (
            <SubscriptionCartProduct
              disabled
              key={product.id}
              product={product}
              handleUpdateCart={() => null}
              stockQuantity={10} />
          );
        })}
      </div>
    ) : null;
  }

  _renderSummary() {
    const {
      saleSubscription: {
        totalPrice,
        shippingTimeRange,
        state,
        stateString,
        shippingEstimatedDate,
        shippingEstimatedWeekDay
      }
    } = this.props

    return (
      <div className='summary'>
        <div>
          <p className='green bold xs'>STATUS</p>
          <Select
            style={{ width: '120px' }}
            value={state}
            onChange={e => console.log(e)}
          >
            <MenuItem value='draft'>Nova</MenuItem>
            <MenuItem value='open'>Ativa</MenuItem>
            <MenuItem value='pending'>Pendente</MenuItem>
            <MenuItem value='close'>Inativa</MenuItem>
            <MenuItem value='cancel'>Cancelada</MenuItem>
          </Select>
          <p className='bold'>{stateString}</p>
        </div>
        <div>
          <p className='green bold xs'>ENTREGA</p>
          <p className='bold md'>{shippingEstimatedDate}</p>
          <p className='semibold gray xs'>{shippingEstimatedWeekDay}</p>
          <p className='bold xxs' style={{ marginTop: '16px' }}>HORÁRIO DE ENTREGA</p>
          <p className='semibold gray xs'>{shippingTimeRange}</p>
        </div>
        <div>
          <p className='green bold xs'>VALOR</p>
          <p className='bold md'>{Formatter.currency(totalPrice)}</p>
        </div>
        <div></div>
        <div>
          <Button id='rebuy'>Refazer pedido</Button>
          <Button id='cancel'>Cancelar pedido</Button>
        </div>
      </div>
    );
  }

  render() {
    const { classes, saleSubscription, history } = this.props;

    if(this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading />
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1>Assinatura{saleSubscription ? ` - ${saleSubscription.name}` : ''}</h1>
        <span onClick={() => history.push('/painel/assinaturas')}><Icon>keyboard_arrow_left</Icon>Voltar</span>
        {saleSubscription && this._renderSummary()}
        {this.state.cart && this._renderCartItems()}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  saleSubscriptions: state.saleSubscriptions.subscriptions,
  saleSubscription: state.saleSubscriptions.current,
  products: state.products.model
});

DashboardSubscription = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(DashboardSubscription);

export { DashboardSubscription }