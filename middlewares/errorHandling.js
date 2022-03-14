const Boom = require('@hapi/boom');
const models = require('../db/models');
const { Log } = models;

const formatError = ({ message, ...err }, stack, data = {} ) => {

    const error = { ...err, error: message, statusError: err.error }
    const isProduction = process.env.NODE_ENV === `production`
    const isJoiError = data?.isJoi ?? false

    if (isJoiError) {
        const failedParams = data?.details ?? []
        error.message = `${message}. ${failedParams
            .join(`.`)}`
            .map((failedParam) => failedParam.message)
        if (!isProduction) {
            error.failedParams = failedParams
        }
    }

    return isProduction ? error : { ...error, stack }

}


const wrapErrors = async ( err, req, res, next ) => {

    if (process.env.LOG_FUL_ERRORS) {
        if (err?.output?.payload) {
            const {
                output: {
                    payload: { message: errorName, error: statusError },
                },
            } = err
            let message = ``
    
            err?.data?.details?.forEach((detail) => {
                const { message: errorMessage } = detail
                message += `${errorMessage} `
            })
            let payload = ``
    
            Object.keys(req?.body).forEach((key) => {
                payload += `${key}: ${req.body[key]}\n`
            })
    
            await Generic.create({
                Model: Log,
                item: {
                    error: errorName,
                    statusError,
                    message,
                    payload,
                    date: new Date(),
                },
            })
        }
    }

    if (err.name === `UnauthorizedError`) {
        return next(Boom.unauthorized(`No se encontró token de autenticación`))
    }
    
    if (!err.isBoom) {
        return next(Boom.badImplementation(err))
    }
    
    return next(err)
}

const errorHandler = ( err, req, res, next ) => { 
    const {
        output: { statusCode, payload },
    } = err
    
    res.status(statusCode).json({ success: false, ...formatError(payload, err.stack, err.data) })
    
}

module.exports = {
    wrapErrors, errorHandler
}















