
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const MainRouter = require('./src/router');
const app = express();


app.set('port', process.env.PORT || 3003);
app.use(express.json());
app.use(cookieParser());
app.use(MainRouter);


app.listen(app.get('port'), ()=>{
    console.log('[App] Listening on port: ' + app.get('port'));
})

