const Boom = require('@hapi/boom');
const { Op } = require("sequelize");

const { users , profileUsers , profiles } = require('../db/models');

const createUserProfile = async ( userId , profilesIds ) => {

    try {

        const userExist = await users.findOne({
            where: { id: userId }
        });

        if(!userExist){
            throwError(`El usuario no existe`)
        } 
        
        const profilesExist = await profiles.findAll({
            where: { 
                id: {
                    [Op.in]: profilesIds
                }
            }
        });

        let profilesUserIds = [];

        profilesExist.forEach( profile => {
    
            if(profilesIds.includes(profile.id)){
                profilesUserIds.push(profile.id);
            }

        });

        let profilesTemp_ = [];
        
        for (const profilesId  of profilesUserIds) {

            const  ProfileUsersTemp = new profileUsers({
                usuario_id: userId,
                profile_id: profilesId
            });

            let profileUser = await ProfileUsersTemp.save();

            if(profileUser?.createdAt ){
                profilesTemp_.push(profileUser.id);
            }
        }


        const userData = await getUserProfile(userId);

        return  {
            ok: true,
            message: 'Perfiles creados correctamente',
            data:{
                ok:true,
                user: userData.data.user,
            }
        };
        
    } catch (error) {
        throwError(`Error al asignar los perfiles  al usuario`)
    }
}


const getUserProfile = async ( userId ) => {

    try {

        const userExist = await users.findOne({
            attributes: ['id','name','lastnames','email', 'createdAt'],
            where: { id: userId }
        });

        if(!userExist){
            throwError(`El usuario no existe`)
        } 
        
        const profilesExist = await profileUsers.findAll({
            where: { 
                usuario_id: userId
            }
        });

        let profilesUserIds = [];

        profilesExist.forEach( profile => {
    
            profilesUserIds.push(profile.profile_id);
        });

        const profilesExist_ = await profiles.findAll({
            where: { 
                id: {
                    [Op.in]: profilesUserIds
                }
            }
        });

        return  {
            ok: true,
            message: 'Perfiles obtenidos correctamente',
            data:{
                user: {
                    id: userExist.id,
                    name: userExist.name,
                    lastnames: userExist.lastnames,
                    email: userExist.email,
                    profiles: profilesExist_
                },
            }
        };
        
    } catch (error) {
        throwError(`Error al recuperar los perfiles del usuario`)
    }

}

module.exports = {
    createUserProfile
}