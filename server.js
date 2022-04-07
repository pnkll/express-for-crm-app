var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//MongoDB 

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'crm';
const db = client.db(dbName)

client.connect(function (err, client) {
    if (err) {
        return console.log(err)
    }   

    app.listen('3012', function (req, res) {
        console.log('API app started')
    })
})


//Requests

app.get('/users', async function  (req, res) {
    const data = db.collection('users')
    const response = await data.find({}).toArray()
    res.send(response)
})

app.post('/users', function (req, res){
    var user = {
        login: req.body.name,
        group: req.body.group,
        password: req.body.password
    }
    
    db.collection('users').insertOne(user, function(err, result){
        if (err){
            console.log(err)
            res.sendStatus(500)
        }
        res.send(user)
    })
    
})

app.post('/login', async function (req, res){
    var user = {
        login: req.body.login,
        password: req.body.password
    }

    const resp = await db.collection('users').findOne(user)
    resp != null && (user.password == resp.password) ? 
    res.send({user: {id: resp._id, login: resp.login, group: resp.group}, resultCode: 0})
    : res.status(200).send({resultCode: 1, message: 'incorrect email or password'})
})

