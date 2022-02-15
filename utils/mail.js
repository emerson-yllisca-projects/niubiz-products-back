const Boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const NanoidAsync = require('nanoid/async');

const sendMail =  async (to, subject, text) => {

    try {

        const { 
            MAIL_HOST,
            MAIL_PORT, 
            MAIL_AUTH_USER, 
            MAIL_AUTH_PASSWORD, 
            MAIL_FROM 
        } = process.env; 
        
        const transporter = await nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: { user: MAIL_AUTH_USER, pass: MAIL_AUTH_PASSWORD },
            secureConnection: false,
            secure: false,     
            tls: {
                rejectUnauthorized: false
            }
        })

        const response =  transporter.sendMail({
            from: MAIL_FROM,
            to: to,
            subject,
            text
        })

        return response;
        
    } catch (error) {
        throw Boom.badRequest(error, error)
    }

}

const buildMailToken  = async ( ) => {
    const access_id = await NanoidAsync.nanoid();
    const message = `Su código de un solo uso es: ${access_id}`;

    return {
        message,
        access_id
    };
}

module.exports = {
    sendMail,
    buildMailToken
}