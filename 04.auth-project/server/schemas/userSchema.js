const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String, required: true, index: true, unique: true, trim: true, minlength: 3, maxlength: 50
    },
    email: {
        type: String, required: true, index: true, unique: true, trim: true, minlength: 5, maxlength: 100
    },
    password: {
        type: String, required: true, trim: true, minlength: 6, maxlength: 1024
    },
    role: {
        type: String, required: true, enum: ['user', 'admin'], default: 'user'
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = UserSchema;