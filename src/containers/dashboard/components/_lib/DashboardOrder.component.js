import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { OrderCard } from '../../molecules';

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

class DashboardOrder extends Component {
  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saleOrders) {
      this.setState({ loading:false });
    }
  }

  componentWillMount() {
    if (this.props.saleOrders) {
      this.setState({ loading:false });
    }
  }

  _renderOrders() {
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
        <h1>Pedido</h1>
        <div className='orders'>
          {this._renderOrders()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  products: state.products.model
});

DashboardOrder = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {})
)(DashboardOrder);

export { DashboardOrder }