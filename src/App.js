import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'

import './styles/css/index.css';

import { setMessageAction } from './store/actions';
// import { Private } from './containers/private';

import defaultTheme from './muiTheme';

import { Header, TopHeader, Footer } from './components';
import { About } from './containers/about';

const actions = { setMessageAction };

class App extends Component {
	render() {
    const { history } = this.props;

		return (
      <MuiThemeProvider theme={defaultTheme}>
        <div className="App">
          <TopHeader history={history} />
          <Header history={history} />
          <Switch>
            <Route path="/quem-somos" exact component={About} />
          </Switch>
          <Footer history={history} />
        </div>
      </MuiThemeProvider>
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
