const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema } = mongoose;
const app = express()

require('dotenv').config()


//middleware

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// app.use(logger)

//body parser middleware
app.use(express.json()); // for parsing application/json

// cors middleware
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}))

const ProductSchema = new Schema({
    title: { type: String, required: true },
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

const Product = mongoose.model('Product', ProductSchema);


//get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            message: 'Products fetched successfully',
            status: 'success',
            data: products
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
})

// get single product by id
app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            status: 'success',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
})

//delete product by id
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            status: 'success',
            data: deletedProduct
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
})

// create a product
app.post("/api/products", async (req, res) => {
    const { title, price, description, category, image } = req.body;
    try {
        if (!title || !price || !description || !category || !image) {
            return res.status(400).json({
                message: 'All fields are required',
                status: 'error'
            })
        }
        const newProduct = new Product({ ...req.body });
        // console.log("newProduct", newProduct);

        await newProduct.save();
        // console.log("newProduct after save", newProduct);

        res.status(201).json({
            message: 'Product created successfully',
            status: 'success',
            data: newProduct
        })

    } catch (error) {
        res.status(500).json({
            message: error,
            status: 'error'
        })
    }
})

//update product by id
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;
    try {
        if (!title || !price || !description || !category || !image) {
            return res.status(400).json({
                message: 'All fields are required',
                status: 'error'
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, {...req.body}, {new: true})

        if(!updatedProduct){
           return res.status(404).json({
                message: 'Product not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Product updated successfully',
            status: 'success',
            data: updatedProduct
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
})

const DB_PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT || 8000
const DB_CONNECT_URL = process.env.DB_CONNECT_URL.replace('<password>', DB_PASSWORD)


mongoose.connect(DB_CONNECT_URL).then(() => {
    console.log("DB connection successful")
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}, http://localhost:${PORT}`)
    })

}).catch((err) => {
    console.log(err)
})
// database: sql, nosql

// sql: structured query language
// nosql: non structured query language

// username: amirovknn_db_user
// password: salam123
// db_string: mongodb+srv: amirovknn_db_user:<db_password>@cluster0.pkjhxkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0