const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)