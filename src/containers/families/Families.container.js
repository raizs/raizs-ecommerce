import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FamiliesList } from './FamiliesList.container';
import { Family } from './Family.container';

export default class Families extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/familias'>
          <FamiliesList />
        </Route>
        <Route path='/familias/:family_id'>
          <Family />
        </Route>
      </Switch>
    );
  }
}