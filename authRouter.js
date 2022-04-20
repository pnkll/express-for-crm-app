const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/login', controller.login)
router.post('/registration',
    [check('email', 'Поле e-mail не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})],
    
    controller.registration)
router.get('/users', authMiddleware, roleMiddleware('Admin'), controller.getUsers)
router.get('/me', authMiddleware, controller.checkAuth)
router.post('/logout', authMiddleware, controller.logout)


module.exports = router