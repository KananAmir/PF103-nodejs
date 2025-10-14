const Product = require("../models/productModel")

//get all products
const getAllProducts = async (req, res) => {
    const { search, sortBy, order, page, limit } = req.query;
    console.log("search", search);
    const filter = {};


    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
            },
            {
                description: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
            }
        ]
    }

    try {
        const products = await Product.find(filter)
            .populate("category", "name") // populate category field with name only
            .collation({ locale: 'en', strength: 2 })
            .sort({
                [sortBy]: order === "asc" ? 1 : -1,
                // createdAt: -1
            })
            .skip(parseInt(page - 1) * parseInt(limit))
            .limit(parseInt(limit));


        const total = await Product.countDocuments(filter)

        res.status(200).json({
            message: 'Products fetched successfully',
            status: 'success',
            data: products,
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit))
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}


const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({
            message: 'All products deleted successfully',
            status: 'success'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        });
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
    console.log(req.file, "");

    const image = req.file ? `http://localhost:8000/${req.file.path}` : null;


    if (!image) {
        return res.status(400).json({
            message: 'Image is required',
            status: 'error'
        })
    }

    console.log(image, "image");

    console.log(req.body, "req body");

    try {

        const newProduct = new Product({ ...req.body, image: image });
        console.log("newProduct", newProduct);

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
    updateProductById,
    deleteAllProducts
}

