const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
const productRoute = require("./routes/productRoute")
const categoryRoute = require("./routes/categoryRoute")
const path = require('path');
const multer  = require('multer')

const app = express()
require('dotenv').config()


//body parser middleware
app.use(express.json()); // for parsing application/json

// app.use(express.static('public'))

// app.use("/static", express.static('public'))

// console.log(__dirname);
// console.log(path.join(__dirname, 'public'));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')))


// const upload = multer({ dest: 'uploads/' })


// app.post('/api/imageUpload', upload.single('image'), function (req, res, next) {
//   // req.file is the `image` file
//   // req.body will hold the text fields, if there were any

//   console.log(req.file);
// })




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/")
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     // cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null, `${uniqueSuffix}-${file.originalname}`)
//   }
// })

// const upload = multer({ storage: storage })


// app.post('/api/imageUpload', upload.single('image'), function (req, res, next) {
//   // req.file is the `image` file
//   // req.body will hold the text fields, if there were any

//   console.log(req.file);
// })


app.get('/', (req, res, next) => {
    console.log("I am middleware");
    next();
}, (req, res) => {
    res.send('Hello World!')
})

// cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use("/api/products", productRoute)
app.use("/api/categories", categoryRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    connectDB()
    console.log(`Example app listening on port ${PORT}, http://localhost:${PORT}`)
})


