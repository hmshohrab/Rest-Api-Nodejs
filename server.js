const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/contacts-db",{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: true })

const db = mongoose.connection

db.off('error', err =>{
   console.log(err)
})
db.on('open', () =>{
   console.log("Database Connection Etablished.")
})

const contactsRoute = require('../rest-tut/api/routes/contact')

const userRoute = require('../rest-tut/api/routes/user')

const app = express();
 
app.use(morgan('dev'))
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

/* app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
}) */

const PORT = process.env.PORT || 3000

app.use((req, res,next) => {
   console.log("I am a middleware function")
   next();
})
app.use('/api/contacts',contactsRoute)//
app.use('/api/users',userRoute)//

app.get('/',(req, res) =>{
   res.send("<h1>Hello <h1>World</h1></h1>")
})

const contacts = [
   { name: "Shohrab",email: "hmshohrab20@gmail.com"},
   { name: "Hahib",email: "habib@gmail.com"},
   { name: "Arafat",email: "arafat@gmail.com"}
]
app.get('/api/contacts',(req, res)=>{
   res.json(contacts)
})

app.get('/demo',(req, res) =>{
 res.json(contacts)
})

app.post('/post',(req, res) =>{
   res.json("<h1>Hi I am a post MAN.</h1>")

})

app.listen(PORT,() =>{
   console.log('listening on port ' + PORT);
 });
