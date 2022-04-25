const User = require('../models/User')

class usersController {
    async getUsers(req, res){
        try {
            const users = await User.find({},{info: 1})
            res.status(200).json({users: users, resultCode: 0})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error, resultCode: 1})
        }
    }
}

module.exports = new usersController()