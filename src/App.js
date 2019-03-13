import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, NavLink } from 'react-router-dom';

import './styles/css/index.css';

import { setMessageAction } from './store/actions';
import { Private } from './containers/private';
import { Header } from './components';

const actions = { setMessageAction };

const AsyncPageDefault = Loadable({
	loader: () => import(/* webpackChunkName: "pageDefault" */ './PageDefault'),
	loading: () => <div>loading page...</div>,
	modules: ['pageDefault'],
});

class App extends Component {
	render() {
		return (
			<div className="App">
        <Header />
				{/* <div className="App-intro">
					<nav>
						<NavLink to="/" exact activeClassName="active">Home</NavLink>
						<NavLink to="/another" activeClassName="active">Another page</NavLink>
					</nav>
					<Switch>
						<Route path="/" exact component={AsyncPageDefault} />
						<Route path="/another" component={Private} />
					</Switch>
				</div> */}
			</div>
		);
	}
}

const mapStateToProps = ({ app }) => ({
	message: app.message
});

export default withRouter(
	connect(
		mapStateToProps,
		actions
	)(App)
);
