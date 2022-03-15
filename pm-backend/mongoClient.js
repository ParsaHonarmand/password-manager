const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://pw-manager:${process.env.MONGO_PW}@password-manager-cluste.kslqf.mongodb.net/password-manager-cluster?retryWrites=true&w=majority`

const mongoClient = new MongoClient(
    uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    }
);

mongoClient.connect((err) => {
    if (err) {
        console.error("Error connecting to the DB: " + err)
        return
    }
    console.log("Connected to DB")
});


module.exports = {
    mongoClient
}