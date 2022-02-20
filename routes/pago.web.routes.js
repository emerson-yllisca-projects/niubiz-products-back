const { Router } = require('express');
const { check , header , param} = require('express-validator');
const { validarCampos  } = require('../middlewares/valida-campos')

const { createTokenAccess , createSessionToken } = require('../controllers/pagoweb/pago.web.controllers')
const { createSessionTokenSchema  } = require('../controllers/pagoWeb/pago.web.schema')
const router = Router();

// create a new access token 
router.get('/access-token' ,[
    check('username','El username es obligatorio').not().isEmpty(),
    check('username', 'El username debe ser un correo electronico').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('type','El type es obligatorio').not().isEmpty(),
   // check('type','El type debe ser uno de los siguientes: development, production').isIn(TYPES_ENVIROMENT),
    validarCampos
],createTokenAccess);

// create a new session token of access token
router.post('/session-token/:merchantId' ,[ createSessionTokenSchema , validarCampos  ],createSessionToken);

module.exports = router;    