import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import theme from '../../src/muiTheme';

// import our main App component
import App from '../../src/App';

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


const path = require("path");
const fs = require("fs");


export default (store) => (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const modules = [];
        const routerContext = {};

        // Send the rendered page back to the client.
        const appBundle = (
            <Loadable.Capture report={m => modules.push(m)}>
                <ReduxProvider store={store}>
                    <StaticRouter location={req.baseUrl} context={routerContext}>
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    </StaticRouter>
                </ReduxProvider>
            </Loadable.Capture>
        );
        
        const sheets = new ServerStyleSheets();
        const html = ReactDOMServer.renderToString(sheets.collect(appBundle));

        // Grab the CSS from our sheets.
        const css = sheets.toString();
        
        // get the stringified state
        const reduxState = JSON.stringify(store.getState());
        // console.log(store.getState().products.currentProduct);

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules)
          .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        // get HTML headers
        const helmet = Helmet.renderStatic();
        console.log('htmlData', htmlData);

        // now inject the rendered app into our html and send it to the client
        return res.send(
          htmlData
            // write the React app
            .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
            // write the string version of our state
            .replace('_REDUX_STATE={}', `REDUX_STATE_=${reduxState}`)
            // append the extra js assets
            .replace('</body>', extraChunks.join('') + '</body>')
            // append the extra js assets
            .replace('</style>', css + '</style>')
            // write the HTML header tags
            .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
        );
    });
}