const { Router } = require('express');

// Controller
const user = require('../controllers/users.controller');

// validators
const { check } = require('express-validator');
const { validarCampos  } = require('../middlewares/valida-campos');

const router = Router();

// crete a new user
router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastnames', 'El apellido es requerido').not().isEmpty(),
    check('profiles', 'Los perfiles son requeridos').not().isEmpty(),
    check('profiles', 'Formato invalido, debe ser un arreglo').isArray(),
    validarCampos
] ,user.create);

module.exports = router;