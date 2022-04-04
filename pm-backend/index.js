require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser')
const authenticate = require('./queries/auth')
const vault = require('./queries/vault')
const path = require("path");
const passwordGenerator = require('./queries/passwordGenerator')
const authMiddleware = require('./queries/authMiddleware')

const app = express()

const port = process.env.PORT || 3001;

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
app.use(express.static(path.resolve(__dirname, "./pm-frontend/build")));

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" })
});

app.post('/login', authenticate.login)
app.post('/signup', authenticate.signUp)

app.post('/addPassword', vault.addPassword)
app.delete('/removePassword', vault.removePassword)
app.put('/changePassword', vault.changePassword)
app.get('/password', vault.getPassword)
app.get('/passwords', vault.getAllPasswords)

app.post('/generatePassword', passwordGenerator.createPassword)

app.listen(port, () => 
    console.log("Server listening on 3001")
)

