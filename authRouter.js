const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

var corsOptions = {
    origin: '*',
    allowedHeaders: 'Authorization',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.post('/login', controller.login)
router.post('/registration',
    [check('login', 'Поле e-mail не должно быть пустым').notEmpty(),
    check('password', 'Пароль дожен содержать минимум 6 символов').isLength({min: 6})],
    controller.registration)
router.get('/users', authMiddleware, roleMiddleware('Admin'), controller.getUsers)
router.get('/me', authMiddleware, controller.checkAuth)


module.exports = router