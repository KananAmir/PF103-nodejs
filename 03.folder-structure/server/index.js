const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/productModel');
const connectDB = require('./config/db');
const productRoute = require("./routes/productRoute")
const { getAllProducts, getProductById, deleteProductById, createProduct, updateProductById } = require('./controllers/productController');
const app = express()
require('dotenv').config()

//body parser middleware
app.use(express.json()); // for parsing application/json

//

// cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use("/api/products", productRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    connectDB()
    console.log(`Example app listening on port ${PORT}, http://localhost:${PORT}`)
})