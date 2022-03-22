require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser')
const authenticate = require('./queries/auth')
const vault = require('./queries/vault')
const passwordGenerator = require('./queries/passwordGenerator')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods",  "*")
    next();
});
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" })
});

app.post('/login', authenticate.login)
app.post('/signup', authenticate.signUp)

app.post('/addPassword', vault.addPassword)
app.delete('/removePassword', vault.removePassword)
app.put('/cahngePassword', vault.changePassword)
app.get('/password', vault.getPassword)
app.get('/passwords', vault.getAllPasswords)

app.get('/generatePassword', passwordGenerator.createPassword)

app.listen(3001, () => 
    console.log("Server listening on 3001")
)

