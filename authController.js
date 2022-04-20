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
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors })
            }
            // const { email, firstName, lastName, password } = req.body


            const candidate = await User.findOne({ email: req.body.email })
            if (candidate) {
                return res.status(400).json({ message: 'Данный e-mail уже зарегистрирован' })
            }
            const hashPassword = bcrypt.hashSync(req.body.password, 5);
            const userRole = await Role.findOne({ value: 'User' })
            const user = new User({ email: req.body.email, password: hashPassword, roles: [userRole.value], firstName: req.body.firstName, lastName: req.body.lastName })
            await user.save()
            return res.json({ message: 'Пользователь успешно зарегистрирован', resultCode: 0 })
            console.log(req.body)
        } catch (error) {
            res.status(400).json({ message: 'Registration error' })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${email} не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль' })
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch (error) {
            res.status(400).json({ message: 'Login error' })
        }
    }
    async checkAuth(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            res.json(user)
        } catch (error) {
            res.status(400).json({ message: 'Auth error' })
        }
    }

    async logout(req, res) {
        try {
            const user = await User.findOne({})
            console.log(user)
            if (!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            res.status(200).json({message: `Пользователь ${user.email} успешно вышел`, resultCode: 0})
            // if (user != null) {
            //     return res.status(200).json({ message: `Пользователь ${email} успешно вышел`, resultCode: 0 })
            // }
            // else { res.status(400).json({ message: `Невозможно выйти` }) }
            // const user = User.findOne({ _id: ObjectId(id) })
            // console.log(user)
            // if (user) {
            //     return res.status(200).json({ message: `Пользователь ${email} успешно вышел`, resultCode: 0 })
            // }
            // else { res.status(400).json({ message: `Невозможно выйти` }) }
        } catch (error) {
            res.status(400).json({ message: 'Logout error'})
        }
    }


    async getUsers(req, res) {
        try {
            // console.log(req.user)
            // const users = await User.find()
            // res.json(users)


        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = new authController()