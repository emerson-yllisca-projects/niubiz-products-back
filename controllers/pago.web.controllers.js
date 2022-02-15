const { successResponse  } = require('../utils/response')
const { generateAccessToken, generateSessionToken } = require('../helpers/niubiz')

const createTokenAccess = async (req, res , next ) => {

    try {

        const { username , password , type} = req.body;
        const token = await generateAccessToken( type , username , password );

        return successResponse(res, {
            message: 'Token de Acceso exitoso',
            accessToken: token
        });

    } catch (error) {
        next(error);
    }

}

const createSessionToken = async ( req , res , next ) => {

    const { merchantId  } = req.params;
    const { accesstoken } = req.headers;
    const { channel , amount , type  } = req.body;
    const ip = (req.headers['x-real-ip'] || req.connection.remoteAddress).split(':')[3].trim();

    try {
    
        const body = {
            "channel":channel,
            "amount":amount,
            "antifraud": {
                "clientIp":ip,
                "merchantDefineData": { }
            }
        }

        const session_token = await generateSessionToken( merchantId , accesstoken , body , type );
        
        return successResponse(res, {
            message: 'Token de Sesión exitoso',
            ...session_token
        });
        
    } catch (error) {
        next(error);
    }
    
}

module.exports = {
    createTokenAccess,
    createSessionToken
}