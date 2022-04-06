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

app.get('/users', function (req, res) {
    res.send(data)
})

app.post('/users', function (req, res){
    var user = {
        name: req.body.name,
        group: req.body.group
    }
    
    db.collection('users').insertOne(user, function(err, result){
        if (err){
            console.log(err)
            res.sendStatus(500)
        }
        res.send(user)
    })
    
})

