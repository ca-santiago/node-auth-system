import express from 'express';
import cors from 'cors';
require('dotenv').config();
import { StartServices } from './StartServices';

const app = express();
app.set('port', process.env.PORT || 3003)

if (process.env.NODE_ENV === 'DEV') {
    const morgan = require('morgan');
    app.use(morgan('tiny'))
}

// SETTING UP MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

// IMPORTING APP ROUTER
import { RouterV1  } from '../router'
import _404 from './_404';

(async () => {
    await StartServices();

    app.use('/api/v1', RouterV1)
    app.use('/ping', (req, res) => res.send('pong!').status(200).end());
    app.use('*', _404);

    app.listen(app.get('port'), () => {
        console.log(`[App] Running on port ${app.get('port')}`)
    })
})()
