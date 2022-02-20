require('moment/locale/es');
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const moment = require('moment-timezone');
moment.locale('es');
moment.tz.setDefault(process.env.TZ);

const { errorHandler , wrapErrors } = require('./middlewares/errorHandling')
const routes = require('./routes/index.routes')

const app = express();
    app
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(`public`, express.static(path.join(__dirname, `public`)))
    .use('/api/v1' , routes)
    .use(wrapErrors)
    .use(errorHandler)

module.exports = app;