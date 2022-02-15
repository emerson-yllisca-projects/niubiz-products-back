const { Router } = require('express');

const { createTokenAccess , createSessionToken } = require('../controllers/pago.web.controllers')

const router = Router();
router.get('/access-token' , createTokenAccess);
router.post('/session-token/:merchantId' , createSessionToken);

module.exports = router;    