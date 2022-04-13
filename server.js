const express = require('express')

var cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = 3012
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'datacrm';

const app = express()

const corsOptions = {
    origin: '*',
    allowedHeaders: 'Authorization',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.json())
app.use('/auth', authRouter)
app.use(cors(corsOptions))

const start = async() => {
    try {
        await mongoose.connect(`${url}/${dbName}`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch (e){

    }
}


start()
