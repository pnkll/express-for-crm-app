var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var jwt = require('jsonwebtoken')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//jwt

const tokenKey = 'sjj'

// app.use((req, res, next) => {
//     if (req.headers.authorization) {
//         jwt.verify(
//             req.headers.authorization.split(' ')[1],
//             tokenKey,
//             (err, payload) => {
//                 if (err) next()
//                 else if (payload) {
//                     for (let user of users) {
//                         if (user.id === payload.id) {
//                             req.user = user
//                             next()
//                         }
//                     }

//                     if (!req.user) next()
//                 }
//             }
//         )
//     }

//     next()
// })



//MongoDB 

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'dataofcrmapp';
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

app.post('/login', async function (req, res) {

    var token = ''
    const resp = await db.collection('users').findOne({ login: req.body.login })
    if (resp != null && (req.body.password == resp.auth.password)) {
        token = jwt.sign({ id: resp._id }, tokenKey)
        db.collection('users').updateOne({ _id: resp._id }, { $set: { 'auth.token': token } })
        res.send({ user: resp, jwt: token, resultCode: 0 })
    }
    else { res.status(200).send({ resultCode: 1, message: 'incorrect email or password' }) }
})

app.get('/auth/me', async function (req,res){
    if( req.query != null){
        db.collection('users').findOne({'auth.token': req.query.jwt})
    }
})


app.get('/users', async function (req, res) {
    try {
        const response = await db.collection('groups').findOne({ title: 'admin' })
        res.status(200).send(response)
    }
    catch {
        res.status(401).send('ошибка')
    }
})
