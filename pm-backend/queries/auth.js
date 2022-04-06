require('dotenv').config()
const { mongoClient } = require('../mongoClient')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateEmail = (email) => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailFormat.test(email))
        return false
    return true
}

// Creates a hashed password with added salt
// This ensures that even when two users choose the same password, their hashes would be different
const hashPassword = async password => {
	const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    console.log("Password is hashed & salted")
    return hash
}

const addUser = async (firstName, lastName, email, hashedPassword, hashedPassphrase) => {
    try {
        const db = mongoClient.db("password-manager-db")
        await db.collection("users").insertOne({ 
            "first_name": firstName, 
            "last_name": lastName, 
            "email":email, 
            "password": hashedPassword, 
            "passphrase": hashedPassphrase 
        })
    } catch (error) {
        return response.status(500).send("Error occured when adding user")
    }
    // Create JWT and send to user
    token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRATION,
    })
    console.log(`Sign up for ${email} successful!`)
    return token
}

// sign up function 
const signUp = async (request, response) => {
    console.log("Signing up now...")
    const { firstName, lastName, email, password, passphrase } = request.body

    if (!validateEmail(email))
        return response.status(400).send("Please Enter a valid email")

    let hashedPassword = await hashPassword(password)
    let hashedPassphrase = await hashPassword(passphrase)
    const db = mongoClient.db("password-manager-db")
    db.collection("users").findOne({ email: email }, async (err, result) =>{
        if (err) 
            response.status(500).send("An error has occured")

        console.log(result);
        if (result !== null) {
            return response.status(400).send("Sorry, that email is already taken")
        }

        let token = await addUser(firstName, lastName, email, hashedPassword, hashedPassphrase)
        if (!token)
            return response.status(500).send("An error has occured")

        response.status(201).send({token: token})
    })
}

// Helper function to check the authenticity of an entered password
const checkPassword = async (dbPassword, loginPassword) => {
    const match = await bcrypt.compare(loginPassword, dbPassword)
    return match
}

const login = async (request, response) => {
    const { email, password } = request.body
    
    if (!validateEmail(email))
        return response.status(400).send("Please Enter a valid email")

    const db = mongoClient.db("password-manager-db")

    db.collection("users").findOne({ email: email }, async (err, result) =>{
        if (err) 
            response.status(500).send("An error has occured")

        if (result === null) {
            return response.status(401).send("Incorrect email/password")
        }
        
        let isAuthenticated = await checkPassword(result.password, password)
        if (isAuthenticated) {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: "60m",
            })
            console.log(`Login for ${result.email} successful!`)
            return response.status(200).send({token: token})
        } else {
            return response.status(401).send("Incorrent email/password")
        }
    })
}


module.exports = {
    login,
    signUp
};