const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : '',
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

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@example.com",
            password: "password",
            entries: 0,
            joined: new Date(),
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@example.com",
            password: "password1",
            entries: 0,
            joined: new Date(),
        },
    ],
} 

 
app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('database.user[0].id')
    } else {
        res.status(404).json("failed logging in")
    }
})

app.post("/register", (req, res) => {
    const {email, password, name} = req.body
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err => {res.status(400).json("unable to register")})
    })
    
    



app.get("/profile/:id", (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length){
            res.json(user[0])
        } else {
            res.status(400).json("user was not found")
        }
    })
    .catch(err => {res.status(400).json("error getting user")})
    // if (!found) {
    //     res.status(404).json("couldn't find id")
    // }

})

app.put("/image", (req, res) => {
    const {id} = req.body;
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
         res.json(entries[0].entries)
      })
      .catch(err => {res.status(400).json("unable to get entries")})
})





app.listen(3000, () => {
    console.log("app is running on local:3000 ")
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



