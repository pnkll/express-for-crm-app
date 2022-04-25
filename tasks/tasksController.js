const User = require('../models/User')
const Task = require('../models/Task')

class tasksController {
    async addTask(req, res) {
        try {
            const maker = await User.findOne({ _id: req.body.makerId })
            const respondent = await User.findOne({ _id: req.body.id })
            console.log(maker)
            const task = new Task({
                important: req.body.important,
                theme: req.body.theme, message: req.body.message,
                maker: {
                    id: maker._id,
                    firstname: maker.info.firstName,
                    lastname: maker.info.lastName
                },
                respondents: [
                    {
                        id: respondent._id,
                        firstname: respondent.info.firstName,
                        lastname: respondent.info.lastName
                    }
                ]
            })
            await task.save()

            res.status(200).json({ message: 'Задача успешно создана', resultCode: 0 })

        } catch (error) {
            res.status(400).json({ error })
        }
    }
    async me(req, res) {
        try {
            const user = await User.findOne({ _id: req.body.id })
            const tasks = await Task.find({ respondents: { $elemMatch: { id: user._id } } })
            res.status(200).json({ tasks: tasks })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
    async getTask(req, res) {
        try {
            const task = await Task.findOne({ _id: req.body.taskId })
            res.status(200).json({ task: task, resultCode: 0 })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

module.exports = new tasksController