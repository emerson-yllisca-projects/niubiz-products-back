const { checkSchema } = require('express-validator');

const loginSchema = checkSchema({

    email: {
        in: ['body'],
        errorMessage: 'El email es requerido',
    },
    
    email:{
        in: ['body'],
        isEmail: true,
        errorMessage: 'El email es invalido',
    },
    
    email:{
        in: ['body'],
        isEmpty:{
            negated: true,
            errorMessage: 'El email no puede estar vacio',
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
    },
    
    password:{
        in: ['body'],
        isString: true,
        errorMessage: 'El password debe ser un string',
    }
});

const verifyTokenSchema = checkSchema({
    
    email: {
        in: ['body'],
        errorMessage: 'El email es requerido',
    },
    
    email:{
        in: ['body'],
        isEmail: true,
        errorMessage: 'El email es invalido',
    },
    
    email:{
        in: ['body'],
        isEmpty:{
            negated: true,
            errorMessage: 'El email no puede estar vacio',
        }
    },

    access_id:{
        in: ['body'],
        errorMessage: 'El access_id es requerido',
    },

    access_id:{
        in: ['body'],
        isEmpty:{
            negated: true,
            errorMessage: 'El access_id no puede estar vacio',
        }
    },

    access_id:{
        in: ['body'],
        isString: true,
        errorMessage: 'El access_id debe ser un string',
    },

});

module.exports = {
    loginSchema , 
    verifyTokenSchema
}