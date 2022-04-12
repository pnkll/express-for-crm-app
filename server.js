const express = require('express')

var cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = 3012
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'datacrm';

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use(cors({origin: '*'}))

const start = async() => {
    try {
        await mongoose.connect(`${url}/${dbName}`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch (e){

    }
}


start()
