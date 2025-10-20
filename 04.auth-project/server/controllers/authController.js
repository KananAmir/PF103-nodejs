const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                status: 'error'
            })  
        }
        //check if user already exists
        const existingUser = await User.findOne({ email: email });

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashedPassword", hashedPassword);
        
        if(existingUser){
            return  res.status(400).json({
                message: 'User already exists',
                status: 'error'
            })
        }

        //create new user
        const newUser = new User({...req.body, password: hashedPassword});
        
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            status: 'success',
            data: newUser
        })
    }
    catch (error) { 
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                status: 'error'
            })  
        }
        //check if user exists
        const existingUser = await User.findOne({ email: email });

        if(!existingUser){
            return  res.status(400).json({
                message: 'Email or password is incorrect',
                status: 'error'
            }) 
        }

        const isPaswordValid = await bcrypt.compare(password, existingUser.password);
        // console.log(isPaswordValid);
        if(!isPaswordValid){
            return  res.status(400).json({
                message: 'Email or password is incorrect',
                status: 'error'
            }) 
        }

        res.status(200).json({
            message: 'User logged in successfully',
            status: 'success',
            data: existingUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'error'
        })
    }
}


module.exports = {
    register,
    login
}