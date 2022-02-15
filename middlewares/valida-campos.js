const { response } = require('express');
const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response')

const validarCampos = (req, res = response, next) => {

    const errores  = validationResult(req);

    if(!errores.isEmpty()){
        return  errorResponse(res , errores.array() , 422);
    }

    next();

}

module.exports = {
    validarCampos
}