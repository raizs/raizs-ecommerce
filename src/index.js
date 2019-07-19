import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import configureStore from './store/configureStore';
// import registerServiceWorker from './registerServiceWorker';
import theme from './muiTheme';
import { ThemeProvider } from '@material-ui/styles';

const store = configureStore( window.__REDUX_STATE__ || {} );

const AppBundle = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </ReduxProvider>
);

window.onload = () => {
    console.log("WINDOW HAS BEEN LOADED")
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            AppBundle,
            document.getElementById('root')
        );
    });
};

// registerServiceWorker();
