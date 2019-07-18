import express from 'express';
import Loadable from 'react-loadable';

import indexController from './controllers/index';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

const PORT = 3000;
import defaultTheme from '../src/muiTheme';
import ReactDOMServer from 'react-dom/server';
import React from "react";
import App from "../src/App";


// initialize the application and create the routes
const app = express();

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}


app.use('/build', express.static('build'));

// app.use(handleRender)

app.use(indexController);

// start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }

        console.log("listening on " + PORT + "...");
    });
});