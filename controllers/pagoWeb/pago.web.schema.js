const { checkSchema } = require('express-validator');
const { TYPES_ENVIROMENT  } = require('../../constants/index')


const createSessionTokenSchema = checkSchema({

    merchantId: {
        in: ['params'],
        isInt: true,
        errorMessage: 'El merchantId del comercio es obligatorio',
    },
    accesstoken : {
        in: ['headers'],
        errorMessage: 'El accesstoken es requerido',
        isString: true
    },
    channel : {
        in: ['body'],
        errorMessage: 'El channel es obligatorio',
    },
    amount : {
        in: ['body'],
        errorMessage: 'El amount es obligatorio',
    },
    type:{
        in: ['body'],
        errorMessage: 'El type es obligatorio',
        in: TYPES_ENVIROMENT
    }

})

module.exports =  {
    createSessionTokenSchema
}

