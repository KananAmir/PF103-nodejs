const User = require("../models/userModel");

//get all users
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({})


        res.status(200).json({
            message: 'Users fetched successfully',
            status: 'success',
            data: users,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}

//get user by id
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
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

//delete user by id
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found',
                status: 'error'
            })
        }

        res.status(200).json({
            message: 'User deleted successfully',
            status: 'success',
            data: deletedUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
}

