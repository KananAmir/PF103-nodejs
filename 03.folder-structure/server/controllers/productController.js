const Product = require("../models/productModel")

//get all products
const getAllProducts = async (req, res) => {
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
}

//get product by id
const getProductById = async (req, res) => {
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
            message: error.message,
            status: 'error'
        })
    }
}

//delete product by id
const deleteProductById = async (req, res) => {
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
}

// create a product

const createProduct = async (req, res) => {
    
    try {
       
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
}

//update product by id

const updateProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true })

        if (!updatedProduct) {
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
}

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById
}

