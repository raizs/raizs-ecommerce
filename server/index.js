import express from 'express';
import Loadable from 'react-loadable';

import indexController from './controllers/index';
import { ServerStyleSheets } from '@material-ui/styles';

const PORT = 3000;
import ReactDOMServer from 'react-dom/server';
import { AppBundle } from '../src';

// initialize the application and create the routes
const app = express();

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