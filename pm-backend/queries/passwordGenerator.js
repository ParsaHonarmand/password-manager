require('dotenv').config()
const { mongoClient } = require('../mongoClient')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createPassword = (request, response) => {
    // here we create a strong password and return it to the frontend 
}

module.exports = {
    createPassword
};