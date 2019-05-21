import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { Generics } from './components';
import { BaseContainer } from '../../helpers';
import { SubscriptionController } from './Subscription.controller';

class Subscription extends BaseContainer {
  constructor(props) {
    super(props, SubscriptionController);
  }

  render() {
    const { subscriptionCart, products } = this.props;

    return (
      <Switch>
        <Route path='/assinatura/genericos'>
          <Generics cart={subscriptionCart} products={products.genericProducts} />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  subscriptionCart: state.subscriptionCart.current,
  products: state.products.model
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(Subscription);