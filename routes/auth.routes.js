const { Router } = require('express');
const { validarCampos } = require('../middlewares/valida-campos')

// Controllers
const auth = require('../controllers/auth/auth.controller');
const authSchema = require('../controllers/auth/auth.schema');

const router = Router();
//login
router.post('/', [ authSchema.loginSchema, validarCampos ] , auth.login ); 
// Verify token after login
router.post('/verify-token', [ authSchema.verifyTokenSchema, validarCampos ] , auth.verifyToken );

module.exports = router;