const Boom = require('@hapi/boom');
const axios = require('axios');

const { NIUBIZ_URLS  } = require('../constants');

const generateAccessToken = async ( type = 'development' , username , password ) => {

    try {

        const { session_access_token  } = NIUBIZ_URLS;
        
        let url = `${process.env.NIUBIZ_API_URL_TEST}${session_access_token}`;
        let username_ = process.env.NIUBIZ_USERNAME;
        let password_ =  process.env.NIUBIZ_PASSWORD;
        let encodedBase64Token = Buffer.from(`${username_}:${password_}`).toString('base64');

        if ( type === 'producttion' ) {
            url = `${process.env.NIUBIZ_API_URL_PRODUCTION}${session_access_token}`;
            username_ = username;
            password_ = password;
            encodedBase64Token = Buffer.from(`${username_}:${password_}`).toString('base64');
        }

        const authorization = `Basic ${encodedBase64Token}`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization
        };

        const { data }= await axios.get(url, { headers });

        return data
        
    } catch (error) {
        throw Boom.badRequest(error.response.data)
    }

}

const generateSessionToken = async ( merchantId , accessToken , body  , type = 'development') => {

    try {
            
            const { session_token  } = NIUBIZ_URLS;
    
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            };
            
            let url = `${process.env.NIUBIZ_API_URL_TEST}${session_token}/${merchantId}`;

            if( type === 'producttion' ){
                url = `${process.env.NIUBIZ_API_URL_PRODUCTION}${session_token}/${merchantId}`;
            }
            const response =  await axios.post(url, body, { headers });

            return response.data;
        
    } catch (error) {
        throw Boom.badRequest(error.response.data.errorMessage)
    }

}

module.exports = {
    generateAccessToken,
    generateSessionToken
}