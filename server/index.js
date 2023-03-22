const express = require('express')
const mysql = require("mysql2")
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const saltRounds = 10
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    key: "userId",
    secret: "dalfjdkfjddfadfa",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60 * 60 * 24,
    }
}))
app.use(cors())


// MySql Database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'blockchainvoting'
})

// REGISTER ROUTE
app.post("/register", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const mobile = req.body.mobile
    const aadhaar = req.body.aadhaar
 

    // Check if user already Exists
    db.query("SELECT * FROM voters WHERE EMAIL = ?", email, (err, result) =>{
        if (err) res.send({err: err})
        if (result.length > 0) {
            res.send({message: "Email already Registered, Please Login!"})
        }else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) console.log(err)
                db.query('INSERT INTO voters (name, email, password, mobile, aadhaar) VALUES (?,?,?,?,?)',
                [name, email, hash, mobile, aadhaar],
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }else{
                        res.send({message: "Voter Registered Successfully!"})
                    }
                }
                )
            })
        }
    })

    
})
// LOGIN ROUTE
app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.query("SELECT * FROM voters WHERE EMAIL = ?", email, (err, result) => {
        if (err) res.send({err: err})
      
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (response){
                    req.session.user = result
                    console.log(req.session.user)
                    res.send({message: `Welcome Back ${result[0].name}`})
                }else {
                    res.send({message: "Invalid Password"})
                }
            })
        }else {
            res.send({message: "User doesn't exist, Please Signup!"})
        }
    })
})

app.get("/profile", (req, res) => {
    db.query("SELECT * FROM voters", (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!")
})