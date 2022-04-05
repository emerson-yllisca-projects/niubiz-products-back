const { checkSchema } = require('express-validator');
const { TYPES_ENVIROMENT  } = require('../../constants/index')

const accessTokenSchema = checkSchema({

    type:{
        in: ['body'],
        isString: true,
        errorMessage: 'El type es requerido y debe ser un string',
    },

   /* type:{
        in: ['body'],
        isIn: [TYPES_ENVIROMENT],
        errorMessage: 'El type debe ser uno de los siguientes valores: '+TYPES_ENVIROMENT.join(', '),
    },*/

    username: {
        in: ['body'],
        errorMessage: 'El username es requerido',
    },

    username:{
        in: ['body'],
        isEmail: true,
        errorMessage: 'El username debe ser un correo electronico',
    },

    username:{
        in: ['body'],
        isEmpty:{
            negated: true,
            errorMessage: 'El username no puede estar vacio',
        }
    },

    password: {
        in: ['body'],
        errorMessage: 'El password es requerido',
    },

    password:{
        in: ['body'],
        isEmpty:{
            negated: true,
            errorMessage: 'El password no puede estar vacio',
        }
    }


});

const createSessionTokenSchema = checkSchema({

    merchantId: {
        in: ['params'],
        isInt: true,
        errorMessage: 'El merchantId del comercio no es valido'
    },

    accesstoken : {
        in: ['headers'],
        isString: true,
        errorMessage: 'El accesstoken es requerido y debe ser un string',
        isEmpty: {
            negated: true,
            errorMessage: 'El accesstoken no puede estar vacio'
        }
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
    accessTokenSchema,
    createSessionTokenSchema
}

