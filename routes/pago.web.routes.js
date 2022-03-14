const { Router } = require('express');
const { check , header , param} = require('express-validator');
const { validarCampos  } = require('../middlewares/valida-campos')

const { createTokenAccess , createSessionToken } = require('../controllers/pagoweb/pago.web.controllers')
const pagoWebSchema  = require('../controllers/pagoWeb/pago.web.schema')
const router = Router();

// create a new access token 
router.get('/access-token' ,[ pagoWebSchema.accessTokenSchema ,validarCampos ],createTokenAccess);

// create a new session token of access token
router.post('/session-token/:merchantId' ,[ pagoWebSchema.createSessionTokenSchema , validarCampos  ],createSessionToken);

module.exports = router;    