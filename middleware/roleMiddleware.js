const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            if (!req.headers.authorization) {
                return res.status(400).json({ message: 'Не отправлен токен' })
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: `Пользователь не авторизован` })
            }
            const userRoles = jwt.verify(token, secret).roles
            const hasRole = { value: false }
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole.value = true
                }
            });
            if (!hasRole.value) {
                return res.status(403).json({ message: 'у вас нет доступа' })
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: `Пользователь не авторизован` })
        }
    }
}