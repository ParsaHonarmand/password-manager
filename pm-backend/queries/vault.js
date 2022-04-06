require('dotenv').config()
const { mongoClient } = require('../mongoClient')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = (rawPassword) => {
    // return encrypted password
}
const decryptPassword = (encryptedPassword) => {
    // return raw password
}

const addPassword = (request, response) => {
    // request body contains the name of website and raw password
    // we envrypt it here and store in database
}
const removePassword = (request, response) => {
    // remove password for that user from their list of passwords
}
const changePassword = (request, response) => {
    // request body contains the name of website and new raw password 
    // we encrypt the new password and replace the old password in DB
}
const getPassword = (request, response) => {
    // request contains the name of the website that we want a password for
    // get password from db, and I think we decrypt here before sending it to the 
    // frontend? 
}
const getAllPasswords = (request, response) => {
    // get the list of encrypted passwords from the DB
    // decrypt each password and return to the frontend
    let email = request.userEmail
    const db = mongoClient.db("password-manager-db")

    db.collection("users").findOne({ email: email }, async (err, result) =>{
        if (err) 
            response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }
        
        console.log("Got all passwords for " + email)
        return response.status(200).send(result.passwords)
    })
}


module.exports = {
    addPassword,
    removePassword,
    changePassword,
    getPassword,
    getAllPasswords
};