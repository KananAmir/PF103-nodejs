const mongoose = require('mongoose');
const express = require('express')
require('dotenv').config()

const DB_PASSWORD = process.env.PASSWORD
const DB_CONNECT_URL = process.env.DB_CONNECT_URL.replace('<password>', DB_PASSWORD)

const connectDB = () => {
    mongoose.connect(DB_CONNECT_URL).then(() => {
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB;