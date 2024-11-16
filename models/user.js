const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: String,
    password: String
})

const contactSchema = mongoose.Schema({
    email: String,
    message: String
})


const User = mongoose.model('User', UserSchema);
const Query = mongoose.model('Query', contactSchema);

module.exports = {
    User,
    Query
}