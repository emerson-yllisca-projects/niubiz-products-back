const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valida-campos')

const auth = require('../controllers/auth/auth.controller');
const router = Router();

//login
router.post('/', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos
] , auth.login ); 

// Verify token after login
router.post('/verify-token', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('access_id', 'El access_id es requerido').not().isEmpty(),
    validarCampos
] , auth.verifyToken );

module.exports = router;