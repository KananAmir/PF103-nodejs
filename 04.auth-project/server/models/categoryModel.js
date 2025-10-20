const mongoose = require('mongoose');
const CategorySchema = require('../schemas/categorySchema');

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;