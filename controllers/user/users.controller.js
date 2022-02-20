const Boom = require('@hapi/boom');
const { users } = require('../../db/models');
const { createUserProfile  } = require('../../services/user.services');  
const {  successResponse } = require('../../utils/response');
const { validateEmial, encryptString } = require('../../utils/strings')

const create  = async ( req , res , next ) => {

    const { name , lastnames , email , password , profiles  } = req.body;
    
    try {

        if(!validateEmial(email)){
            throw Boom.badRequest('El email no es valido');
        }
        
        // search if the user exist
        const userExist = await users.findOne({
            where: { email }
        });
    
        if(userExist){
            throw Boom.badRequest(`El email ya existe`);
        }

        const user = new users({
            name,
            lastnames,
            email,
            password:encryptString(password),
        });

        await user.save();

        // create user profile
        let profilesUsers =  await createUserProfile(user.id , profiles);

        if(profilesUsers.ok){

            const { data }  = profilesUsers;

            return successResponse(res, {
                user:data.user, 
            });
        } else {
            throwError(message, profilesUsers.message)
        }

    } catch (error) {
        return next(error)
    }

}

module.exports = {
    create
};   