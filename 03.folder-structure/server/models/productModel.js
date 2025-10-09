const mongoose = require('mongoose');
const ProductSchema = require('../schemas/productSchema');

const Product = mongoose.model('Product', ProductSchema);
   
module.exports = Product;