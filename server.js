const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'rahulrajkumar',
      password : '',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data); 
})

  const app = express();

app.use(bodyparser.json())
app.use(cors())

 
 app.get("/", (req, res) => {res.send("it's working now!")})
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.post("/imageurl", (req, res) => {image.handleAPICall(req, res)})





app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on ${process.env.PORT}`);
})



/*

/ >>> req = this is working 👍
/signin >>> POST  = success/fail
/register >>> POST = user 
/profile/:userid >>> GET = user 
/image  >>> PUT = updated user object

 */



// bcrypt.compare("apples", "$2a$10$A2PjIRaWUIO.bwNBG/R3s.3ncZydWLl5fAd/v8nJFzrJBGS5H0y4m", function(err, res) {
    //     console.log("first password", res)
    // });
    // bcrypt.compare("veggies", "$2a$10$A2PjIRaWUIO.bwNBG/R3s.3ncZydWLl5fAd/v8nJFzrJBGS5H0y4m", function(err, res) {
    //     console.log("second password", res)
    // });

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });



