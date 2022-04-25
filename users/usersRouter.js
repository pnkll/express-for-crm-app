const Router = require('express')
const router = new Router()
const controller = require('./usersController')

router.get('/list', controller.getUsers)

module.exports = router