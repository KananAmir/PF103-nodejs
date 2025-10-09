const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 100 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = ProductSchema;