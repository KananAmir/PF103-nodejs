const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String, required: true, index: true, unique: true, trim: true, minlength: 3, maxlength: 100
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = CategorySchema;