const Router = require('express')
const router = new Router()
const controller = require('./tasksController')

router.post('/add', controller.addTask)
router.post('/me', controller.me)
router.post('/task', controller.getTask)

module.exports = router