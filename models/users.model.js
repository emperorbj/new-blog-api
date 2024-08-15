const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter your name']
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema);
module.exports = User