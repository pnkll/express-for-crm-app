const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')


const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const { login, password } = req.body
            const candidate = await User.findOne({ login })
            if (candidate) {
                return res.status(400).json({ message: 'Данный e-mail уже зарегистрирован' })
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: 'User'})
            const user = new User({login, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (error) {
            res.status(400).json({ message: 'Registration error' })
        }
    }
    async login(req, res) {
        try {
            const { login, password} = req.body
            const user = await User.findOne({login})
            if (!user){
                return res.status(400).json({message: `Пользователь ${login} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (error) {
            res.status(400).json({ message: 'Login error' })
        }
    }
    async getUsers(req, res) {
        try {
            console.log(req.user)
            const users = await User.find()
            res.json(users)

        } catch (error) {
            res.json(error)
        }
    }
    async checkAuth(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            res.json(user)
        } catch (error) {
            res.status(400).json({message: 'Auth error'})
        }
    }
}

module.exports = new authController()