const Router = require('express')
const router = new Router()
const controller = require('./authController')


router.post('/login', controller.login)
router.post('/registration', controller.registration)
router.get('/users', controller.getUsers)

module.exports = router