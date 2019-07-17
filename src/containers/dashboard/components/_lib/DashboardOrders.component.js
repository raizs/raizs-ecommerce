import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { OrderCard } from '../../molecules';
import { selectSaleOrderAction, updateCartAction } from '../../../../store/actions';
import { CartHelper } from '../../../../helpers';
import { toast } from 'react-toastify';

const actions = { selectSaleOrderAction, updateCartAction };

const styles = theme => ({
  wrapper:{
    display: "inline-block",
    width: "100%",
    padding: 5 * theme.spacing.unit,
    verticalAlign: "top",
    '& > h1': {
      ...theme.typography.bigTitle,
      textAlign: 'left'
    },
    '& > div.orders': {
      marginTop: 4 * theme.spacing.unit
    }
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    padding: 2 * theme.spacing.unit
  }
});

class DashboardOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  
  componentWillMount() {
    if (this.props.saleOrders) this.setState({ loading:false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saleOrders && !this.props.saleOrders) this.setState({ loading:false });
  }

  _renderOrders() {
    const {
      saleOrders,
      selectSaleOrderAction,
      history,
      products,
      stockDate,
      updateCartAction
    } = this.props;

    const handleViewSaleOrder = saleOrder => {
      if(saleOrder) {
        selectSaleOrderAction(saleOrder);
        history.push(`/painel/pedidos/${saleOrder.id}`);
      }
    }
    
    const handleRebuyClick = saleOrder => {
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

    return saleOrders && saleOrders.all.length ? saleOrders.all.map(saleOrder => {
      return (
        <OrderCard
          key={saleOrder.id}
          saleOrder={saleOrder}
          handleViewSaleOrder={handleViewSaleOrder}
          handleRebuyClick={handleRebuyClick}
        />
      )
    }) : <p>Você ainda não fez nenhum pedido.</p>;
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div style={{ height: window.innerHeight - 96 }}>
        <Loading />
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1>Seus Pedidos</h1>
        <div className='orders'>
          {this._renderOrders()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  products: state.products.model,
  stockDate: state.datePicker.obj.stockDate
});

DashboardOrders = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(DashboardOrders);

export { DashboardOrders }