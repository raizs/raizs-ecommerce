import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { Generics, Complements } from './components';
import { BaseContainer } from '../../helpers';
import { SubscriptionController } from './Subscription.controller';
import { updateSubscriptionCartAction, setCurrentObservationsAction } from '../../store/actions';

const actions = { updateSubscriptionCartAction, setCurrentObservationsAction };

class Subscription extends BaseContainer {
  constructor(props) {
    super(props, SubscriptionController);
  }

  render() {
    const {
      subscriptionCart,
      currentObservations,
      products,
      categories,
      newProducts
    } = this.props;
    const {
      handleUpdateSubscriptionCart,
      handleContinueAction
    } = this.controller;

    return (
      <Switch>
        <Route path='/assinatura/genericos'>
          <Generics
            cart={subscriptionCart}
            products={products.genericProducts}
            handleUpdate={handleUpdateSubscriptionCart}
            currentObservations={currentObservations}
            handleContinueAction={handleContinueAction}
          />
        </Route>
        <Route path='/assinatura/complementos'>
          <Complements
            cart={subscriptionCart}
            products={products}
            handleUpdate={handleUpdateSubscriptionCart}
            categories={categories}
            newProducts={newProducts}
          />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  subscriptionCart: state.subscriptionCart.current,
  currentObservations: state.subscriptionCart.currentObservations,
  products: state.products.model,
  categories: state.categories.model,
  newProducts: state.products.newProducts
});

export default compose(
  withRouter,
  connect(mapStateToProps, actions)
)(Subscription);