
const Boom = require('@hapi/boom')

const { MAIL_SUBJECT } = require('../../constants');
const { users } = require('../../db/models');  

// Modelo de usuario
const { successResponse  } = require('../../utils/response')
const { validPassword } = require('../../utils/strings')
const { sendMail , buildMailToken } = require('../../utils/mail')
const { updateAccessToken , getLatestHistory  } = require('../../services/auth.service')
const { generarJWT } = require('../../helpers/auth')

const login = async (req, res , next) => {
    
    const { email , password } = req.body;
    
    try {

        const user = await users.findOne({
            where: {
                email
            }
            
        });

        if(!user){
            throw Boom.badRequest('Usuario no encontrado');
        }

        if(!validPassword(password, user.password)){
            throw Boom.badRequest('Contraseña incorrecta');
        }

        const { message , access_id } =  await buildMailToken();
        const history_access = await updateAccessToken(user.id, access_id)
        
        if(!history_access || history_access ==  null){
            throw Boom.badRequest('Error al crear el token de acceso');
        }
        
        // Send Mail with token
        await  sendMail(email, MAIL_SUBJECT , message);

        return successResponse(res, {
            message: 'Login exitoso',
            history_acess:{
                date: history_access.fecha,
                id: history_access.id,
                usuario_id: history_access.usuario_id
            }
        })

    } catch (error) {
        next(error);
    }
}

const  verifyToken  = async (req, res, next) => {

    try {

        const { access_id, email } = req.body;

        const user = await users.findOne({
            attributes: ['id', 'name', 'lastnames', 'email', 'createdAt'],
            where: {
                email
            }
        });

        if (!user) {
            throw Boom.badRequest('Usuario no encontrado');
        }

        const history_access = await getLatestHistory(user.id);

        if (!history_access || history_access == null) {
            throw Boom.badRequest('El usuario no tiene un token activo');
        }

        if (history_access.token != access_id) {
            throw Boom.badRequest('El token no es valido');
        }

        const token = await generarJWT(user.id);

        return successResponse(res, {
            message: 'Verificación exitosa',
            user: {
                id: user.id,
                name: user.name,
                lastnames: user.lastnames,
                email: user.email,
                createdAt: user.createdAt
            },
            token
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    verifyToken
}