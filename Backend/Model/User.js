const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role:{
        type: String,
        default:"user"
    },
    password: {
        type: String,
        required: true
    },
    Address: {
        type: [],
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);
