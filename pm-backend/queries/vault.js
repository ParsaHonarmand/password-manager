require('dotenv').config()
const { mongoClient } = require('../mongoClient')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const encryptPassword = (rawPassword, key) => {    // potentially use login password as key
    // return encrypted password
    let encryptedPassword = cryptojs.AES.encrypt(rawPassword, key).toString();
    return encryptedPassword;
}
const decryptPassword = (encryptedPassword, key) => {  // potentially use login password as key
    // return raw password
    let decryptedPassword = cryptojs.AES.decrypt(encryptedPassword, key).toString(cryptojs.enc.Utf8);
    return decryptedPassword;
}

const addPassword = (request, response) => {
    // request body contains the name of website and raw password
    // we envrypt it here and store in database
    const { website, username, password } = request.body
    const email = request.userEmail
    const db = mongoClient.db("password-manager-db")
    let hash
    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err) 
            response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }
        hash = result.password
        const encryptedPassword = encryptPassword(password, hash)
        db.collection("users").updateOne(
            { email: email },
            { $push: 
                { passwords: { "label": website, "username": username, "password": encryptedPassword }}
            }, (err, result) => {
                if (err)
                    return response.status(500).send("Unable to add password")
                console.log("Added successfully")
                return response.status(200).send("Added succcessfully")
            }
        )
    })
}
const removePassword = (request, response) => {
    // remove password for that user from their list of passwords
    const { requestedSite } = request.body
    console.log("removing entry for " + requestedSite)
    const email = request.userEmail
    const db = mongoClient.db("password-manager-db")
    
    db.collection("users").updateOne(
        { email: email }, 
        { $pull: { passwords: { label: requestedSite } } },
        (err, result) => {
            if (err)
                response.status(500).send("An error has occured")
            return response.status(200).send("Deleted Successfully")
        }
    );
}
const changePassword = (request, response) => {
    // request body contains the name of website and new raw password 
    // we encrypt the new password and replace the old password in DB
    const { label, newUsername, newPassword} = request.body
    console.log("Editing entry for " + label)
    const email = request.userEmail
    const db = mongoClient.db("password-manager-db")
    
    let hash
    let newEncryptedPassword
    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err) 
            return response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }
        hash = result.password
        newEncryptedPassword = encryptPassword(newPassword, hash)
        console.log("Encrypted the new password")
        db.collection("users").updateOne(
            { email: email }, 
            { $set: {
                "passwords.$[item].username": newUsername,
                "passwords.$[item].password": newEncryptedPassword,
            }},
            {
                arrayFilters: [
                  {
                    "item.label": {
                      $eq: label
                    },
                  }
                ],
            },
            (err, result) => {
                if (err)
                    response.status(500).send("An error has occured")
                return response.status(200).send("Modified Successfully")
            }
        );
    })
}
const getPassword = (request, response) => {
    // request contains the name of the website that we want a password for
    // get password from db, and I think we decrypt here before sending it to the 
    // frontend? 
    let email = request.userEmail
    let requestedPassword = request.query.label
    const db = mongoClient.db("password-manager-db")
    console.log(requestedPassword)
    console.log(email)
    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err) 
            response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }
        
        for (let index = 0; index < result.passwords.length; index++) {
            const item = result.passwords[index];
            if (item.label.toLowerCase() === requestedPassword.toLowerCase()) {
                console.log("Got password details for " + email)
                item.password = decryptPassword(item.password, result.password)
                return response.status(200).send(item)
            }
        }
        return response.status(304).send("No password found")
    })
}

const VerifyPassPhrase = async (passphrase, realPassphrase) => {
    const match = await bcrypt.compare(passphrase, realPassphrase)
    return match
}

const getAllPasswords = (request, response) => {
    // get the list of encrypted passwords from the DB
    // decrypt each password and return to the frontend
    let email = request.userEmail
    let passphrase = request.body.passphrase
    // need to decrypt this passphrase 

    const db = mongoClient.db("password-manager-db")

    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err) 
            response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }

        if (VerifyPassPhrase(passphrase, result.passphrase)) {
            let passwordLabels = []
            result.passwords.forEach(item => {
                passwordLabels.push(item.label)
            });
            console.log("Got all password labels for " + email)
            return response.status(200).send(passwordLabels)
        } else {
            return response.status(401).send("Incorrect vault password")
        }
    })
}


module.exports = {
    addPassword,
    removePassword,
    changePassword,
    getPassword,
    getAllPasswords
};