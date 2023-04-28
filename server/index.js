const express = require('express')
const mysql = require("mysql2")
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({credentials: true, origin: true}))

const saltRounds = 10

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
            res.send({status: 409, message: "Email already Registered, Please Login!"})
        }else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) console.log(err)
                db.query('INSERT INTO voters (name, email, password, mobile, aadhaar, voted) VALUES (?,?,?,?,?,?)',
                [name, email, hash, mobile, aadhaar, 0],
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }else{
                        res.send({status: 200, message: "Voter Registered Successfully!"})
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
                    const {password, ...other} = result[0]
                    // Creating Json Web token
                    const token = jwt.sign({id: result[0].id}, "jwtsecretkey")
                    // Creating Cookies
                    res.cookie("access_token", token, {
                        httpOnly: true
                    }).status(200).json(other)
                }else {
                    res.send({status: 401, message: "Invalid Password"})
                }
            })
        }else {
            res.send({status: 401, message: "User doesn't exist, Please Signup!"})
        }
    })
})
// LOGOUT
app.post("/logout", (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!")
})