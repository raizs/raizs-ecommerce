import React from 'react'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { Generics, Complements, Review } from './components';
import { BaseContainer } from '../../helpers';
import { SubscriptionController } from './Subscription.controller';
import {
  updateSubscriptionCartAction,
  setCurrentObservationsAction,
  setSubscriptionNameAction,
  addSubscriptionCartToCartAction
} from '../../store/actions';
import { withCookies } from 'react-cookie';

const actions = {
  updateSubscriptionCartAction,
  setCurrentObservationsAction,
  setSubscriptionNameAction,
  addSubscriptionCartToCartAction
};

class Subscription extends BaseContainer {
  constructor(props) {
    super(props, SubscriptionController);
  }

  state = {
    cep: '',
    cepLoading: false,
    cepSuccess: false,
    cepError: false,
    shippingValue: '',
    coupon: ''
  }

  componentDidMount() {
    document.title = 'Raízs | Assinatura';
  }
  
  render() {
    // const {
    //   cep,
    //   cepLoading,
    //   cepSuccess,
    //   cepError,
    //   shippingValue,
    //   coupon
    // } = this.state;
    const {
      subscriptionCart,
      currentObservations,
      products,
      categories,
      newProducts,
      brands,
      stockDate,
      updateSubscriptionCartAction,
      // history,
      // subscriptionName,
      // dateObj,
    } = this.props;
    const {
      handleUpdateSubscriptionCart,
      handleContinueAction,
      // handleChange,
      // handleCepBlur,
      // handleCheckout
    } = this.controller;

    return (
      <Switch>
        <Route path='/assinatura/genericos'>
          <Generics
            cart={subscriptionCart}
            allProducts={products}
            products={products.genericProducts}
            handleUpdate={handleUpdateSubscriptionCart}
            currentObservations={currentObservations}
            handleContinueAction={handleContinueAction}
            stockDate={stockDate}
            updateSubscriptionCartAction={updateSubscriptionCartAction}
          />
        </Route>
        <Route path='/assinatura/complementos'>
          <Complements
            cart={subscriptionCart}
            products={products}
            handleUpdate={handleUpdateSubscriptionCart}
            categories={categories}
            newProducts={newProducts}
            brands={brands}
            stockDate={stockDate}
          />
        </Route>
        {/* <Route path='/assinatura/revisao'>
          <Review
            cart={subscriptionCart}
            products={products}
            handleUpdateCart={handleUpdateSubscriptionCart}
            history={history}
            handleChange={handleChange}
            handleCepBlur={handleCepBlur}
            cep={cep}
            cepLoading={cepLoading}
            cepSuccess={cepSuccess}
            cepError={cepError}
            shippingValue={shippingValue}
            coupon={coupon}
            subscriptionName={subscriptionName}
            handleCheckout={handleCheckout}
            stockDate={stockDate}
            dateObj={dateObj}
          />
        </Route> */}
        <Route path='/assinatura/carrinho' component={() => <Redirect to='/carrinho' />} />
        <Route path="/assinatura" component={() => <Redirect to="/assinatura/genericos" />} />
        <Route path="/assinatura*" component={() => <Redirect to="/assinatura/genericos" />} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  subscriptionCart: state.subscriptionCart.current,
  currentObservations: state.subscriptionCart.currentObservations,
  subscriptionName: state.subscriptionCart.subscriptionName,
  products: state.products.model,
  categories: state.categories.model,
  newProducts: state.products.newProducts,
  brands: state.brands.model,
  stockDate: state.datePicker.obj.stockDate,
  dateObj: state.datePicker.obj
});

export default compose(
  withCookies,
  withRouter,
  connect(mapStateToProps, actions)
)(Subscription);