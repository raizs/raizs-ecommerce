import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { OrderCard } from '../../molecules';
import { selectSaleOrderAction } from '../../../../store/actions';

const actions = { selectSaleOrderAction };

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
    '& > div.subscriptions': {
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

class DashboardSubscriptions extends Component {
  state = {
    loading: true
  }
  
  componentWillMount() {
    if (this.props.saleOrders) this.setState({ loading:false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saleOrders && !this.props.saleOrders) this.setState({ loading:false });
  }

  _renderSubscriptions() {
    const { saleOrders, selectSaleOrderAction, history } = this.props;
    const handleViewSaleOrder = saleOrder => {
      if(saleOrder) {
        selectSaleOrderAction(saleOrder);
        history.push(`/painel/pedidos/${saleOrder.id}`);
      }
    }

    return saleOrders && saleOrders.all.length ? saleOrders.all.map(saleOrder => {
      return (
        <OrderCard key={saleOrder.id} saleOrder={saleOrder} handleViewSaleOrder={handleViewSaleOrder} />
      )
    }) : <p>Você ainda não fez nenhum pedido.</p>;
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading />
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1>Suas Assinaturas</h1>
        <div className='subscriptions'>
          {this._renderSubscriptions()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders
});

DashboardSubscriptions = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(DashboardSubscriptions);

export { DashboardSubscriptions }