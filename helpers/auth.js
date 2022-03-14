const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            id:uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token)
            }
        });
        
    })
    
}

module.exports = {
    generarJWT
}