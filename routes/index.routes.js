const { Router } = require('express');
const user = require('./users.routes');
const auth = require('./auth.routes');
const pagoweb = require('./pago.web.routes');

const router = Router();
router.use('/users', user);
router.use('/auth', auth);
router.use('/pago-web' , pagoweb )

module.exports = router;