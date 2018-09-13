const controller  = require('./controller')

const express     = require('express')
const session 		= require('express-session')
const bodyParser  = require('body-parser')
const massive 		= require('massive')
										require('dotenv').config()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

const app = express()

app.use (express.static(`${__dirname}/../build`))
app.use (bodyParser.json())
app.use ((req,res,next)=>{console.log('first log!');next(console.log('nexted!'))})

app.get('/api/waffle',controller.waffle)
app.get('/api/get/:query',controller.get)
app.post('/api/post',controller.post)
app.put('/api/meow/:id',controller.put)
app.delete('/api/dog/:id',controller.delete)


app.listen(SERVER_PORT,()=>{console.log(`Wubstep Wubbeth into port: ${SERVER_PORT}`)})