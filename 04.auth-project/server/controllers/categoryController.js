const Category = require("../models/categoryModel")
const Product = require("../models/productModel")

//get all products
const getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find({})


        res.status(200).json({
            message: 'Categories fetched successfully',
            status: 'success',
            data: categories,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}

//get category by id
const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Category fetched successfully',
            status: 'success',
            data: category
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}

//delete category by id
const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id)
        await Product.deleteMany({
            category: {
                _id: id
            }
        })
        
        if (!deletedCategory) {
            return res.status(404).json({
                message: 'Category not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Category deleted successfully',
            status: 'success',
            data: deletedCategory
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
}

// create a category

const createCategory = async (req, res) => {

    try {

        const newCategory = new Category({ ...req.body });

        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            status: 'success',
            data: newCategory
        })

    } catch (error) {
        res.status(500).json({
            message: error,
            status: 'error'
        })
    }
}

//update category by id

const updateCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { ...req.body }, { new: true })

        if (!updatedCategory) {
            return res.status(404).json({
                message: 'Category not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'Category updated successfully',
            status: 'success',
            data: updatedCategory
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            status: 'error'
        })
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    deleteCategoryById,
    createCategory,
    updateCategoryById
}

