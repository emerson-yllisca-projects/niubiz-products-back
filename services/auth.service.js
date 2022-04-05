const { Op } = require("sequelize");
const Boom = require('@hapi/boom');
const momment = require('moment');

const { historyAcccess } = require('../db/models')

const updateAccessToken = async (userId , accessToken) => {

    try {   

        const previous_history = await  getLatestHistory(userId);

        if(previous_history){
            throw Boom.badRequest('El usuario ya tiene un token activo');
        }
        
        let history = null;

        if(!previous_history){

            const current_date = momment().format('YYYY-MM-DD HH:mm:ss');
            
            history =  await historyAcccess.create({
                usuario_id: userId,
                token: accessToken,
                fecha:current_date,
            })
            
        }

        return history;
    
    } catch (error) {
        throw Boom.badRequest(error, error)
    }
}

const getLatestHistory = async (userId) => {

    try{

        const previous_history = await historyAcccess.findOne({
            where: {
                usuario_id: userId,
                fecha:{
                    [Op.lte]:momment().format('YYYY-MM-DD HH:mm:ss'),
                    [Op.gte]:momment().subtract(4, 'minute').format('YYYY-MM-DD HH:mm:ss')
                },
                estado:1
            }
        });

        if(previous_history){
            // update status to 0

            await historyAcccess.update({
                estado:0
            },{
                where:{
                    id:previous_history.id
                }
            })
            
        }

        return previous_history;

    }catch(error){
        throw Boom.badRequest(error, error)
    }
}


module.exports = {
    updateAccessToken,
    getLatestHistory
}