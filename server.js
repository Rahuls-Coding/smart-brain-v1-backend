const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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
    
    database.users.push(
        {
            id: "125",
            name: name,
            email: email,
            entries: 0,
            joined: new Date(),
        }
    ) 
    res.json(database.users[database.users.length - 1])
})


app.get("/profile/:id", (req, res) => {
    const {id} = req.params;
    let found = false 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json("couldn't find id")
    }

})

app.put("/image", (req, res) => {
    const {id} = req.body;
    let found = false 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json("couldn't find id")
    }
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



