require('dotenv').config()
const { generate } = require('generate-passphrase')
const generator = require('generate-password');

const createPassword = (request, response) => {
    // here we create a strong password and return it to the frontend 
    const length = request.body.length
    const type = request.body.type
    let generatedPassword
    if (type === "word") {
        generatedPassword = generator.generate({
            length: length,
            numbers: true,
            symbols: true,
            uppercase: true,
        });
        console.log(generatedPassword)
    } else if (type === "phrase") {
        generatedPassword = generate({length: length, separator: " ", titlecase: true}) 
    }
    response.status(200).send(generatedPassword)
}

module.exports = {
    createPassword
};