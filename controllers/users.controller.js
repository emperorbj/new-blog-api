const User = require('../models/users.model');

const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({});
        if(!users){
            return res.status(404).json({message: 'No users found'});
        }
        return res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({messsage: error.message})
    }
} 


module.exports = {
    getAllUsers
}
