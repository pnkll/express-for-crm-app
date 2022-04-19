const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        if (!req.headers.authorization){
            return res.status(400).json({message: 'Не отправлен токен'})
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' })
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
}