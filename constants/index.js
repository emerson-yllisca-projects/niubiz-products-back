
// EMAIL - CONSTANTS
const EMAIL_EXPRESION_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const MAIL_SUBJECT='Código de inicio de sesión';

// NIUBIZ - CONSTANTS ( OBJECT )
const NIUBIZ_URLS = {
    session_access_token: '/api.security/v1/security',
    session_token:'/api.ecommerce/v2/ecommerce/token/session'
}

const TYPES_ENVIROMENT= ['development','production'];

module.exports = {
    EMAIL_EXPRESION_REGEX,
    MAIL_SUBJECT,
    NIUBIZ_URLS,
    TYPES_ENVIROMENT
}