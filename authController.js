const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');

class authController {
    async registration(req, res) {
        try {
            const { login, password } = req.body
            const candidate = await User.findOne({ login })
            if (candidate) {
                return res.status(400).json({ message: 'Данный e-mail уже зарегистрирован' })
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: 'User'})
            const user = new User({login, password: hashPassword, roles: [userRole.value]})
            await user.save
            res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (error) {
            res.status(400).json({ message: 'Registration error' })
        }
    }
    async login(req, res) {
        try {

        } catch (error) {
            res.status(400).json({ message: 'Login error' })
        }
    }
    async getUsers(req, res) {
        try {
            console.log('server work')
        } catch (error) {
            res.json('e')
        }
    }
}

module.exports = new authController()