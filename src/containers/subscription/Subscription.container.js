import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { Generics, Complements } from './components';
import { BaseContainer } from '../../helpers';
import { SubscriptionController } from './Subscription.controller';
import { updateSubscriptionCartAction } from '../../store/actions';

const actions = { updateSubscriptionCartAction };

class Subscription extends BaseContainer {
  constructor(props) {
    super(props, SubscriptionController);
  }

  render() {
    const { subscriptionCart, products, categories } = this.props;
    const { handleUpdateSubscriptionCart } = this.controller;

    return (
      <Switch>
        <Route path='/assinatura/genericos'>
          <Generics
            cart={subscriptionCart}
            products={products.genericProducts}
            handleUpdate={handleUpdateSubscriptionCart}
          />
        </Route>
        <Route path='/assinatura/complementos'>
          <Complements
            cart={subscriptionCart}
            products={products.catalogProducts}
            handleUpdate={handleUpdateSubscriptionCart}
            categories={categories}
          />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  subscriptionCart: state.subscriptionCart.current,
  products: state.products.model,
  categories: state.categories.model
});

export default compose(
  withRouter,
  connect(mapStateToProps, actions)
)(Subscription);