import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withFirebase } from 'react-redux-firebase';
import { CookiesProvider, withCookies } from 'react-cookie';
import { BrowserView/*, MobileView*/ } from 'react-device-detect';
import compose from 'recompose/compose';

import './styles/css/index.css';
import 'moment/locale/pt-br.js';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import MobileApp from './App.mobile';
import BrowserApp from './App.browser';

class App extends Component {

	render() {
    if (typeof window === 'undefined') {
      global.window = {}
    }
    
		return (
      <CookiesProvider>
        <BrowserView>
          <BrowserApp />
        </BrowserView>

        {/* <MobileView>
          <MobileApp />
        </MobileView> */}
        
      </CookiesProvider>
    );
  }
}

export default compose(
  withCookies,
  withRouter,
  withFirebase
)(App);
