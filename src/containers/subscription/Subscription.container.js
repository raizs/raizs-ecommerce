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
    return (
      <Switch>
        <Route path='/assinatura/genericos'>
          <Generics />
        </Route>
      </Switch>
    )
  }
}

export default compose(
  withRouter,
  connect(null, null)
)(Subscription);