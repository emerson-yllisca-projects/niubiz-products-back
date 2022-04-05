require('moment/locale/es');
require('dotenv').config();
const jwt = require('express-jwt');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const moment = require('moment-timezone');

moment.locale('es');
moment.tz.setDefault(process.env.TZ);

const { errorHandler , wrapErrors } = require('./middlewares/errorHandling')
const routes = require('./routes/index.routes')

const app = express();

const unsecuredRoutes = [
    `/api/v1/auth`,
    `/api/v1/auth/verify-token`,
    /\/public*/,
    `/api/v1`,
]

/*
app.use(
    jwt({ secret: process.env.JWT_SECRET, algorithms: [`HS256`] }).unless({
        path: unsecuredRoutes,
    }),
)*/

    app
    .use(cors())
    .use(morgan('dev'))
    .use(helmet())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(`public`, express.static(path.join(__dirname, `public`)))
    .use('/api/v1' , routes)
    .use(wrapErrors)
    .use(errorHandler)

module.exports = app;