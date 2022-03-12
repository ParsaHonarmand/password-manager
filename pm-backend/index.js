require("dotenv").config()
const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods",  "*")
    next();
});
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())


const uri = `mongodb+srv://pw-manager:${process.env.MONGO_PW}@password-manager-cluste.kslqf.mongodb.net/password-manager-cluster?retryWrites=true&w=majority`
const client = new MongoClient(
    uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    }
);

let db, users

client.connect((err, client) => {
    if (err) {
        console.error("Error connecting to the DB: " + err)
        return
    }
    console.log("Connected to DB")
    db = client.db("password-manager-db")
    users = db.collection("users")
});


app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" })
});

app.listen(3001, () => 
    console.log("Server listening on 3001")
)

