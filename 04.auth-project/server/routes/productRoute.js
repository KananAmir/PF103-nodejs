const express = require("express")
const { getAllProducts, getProductById, deleteProductById, createProduct, updateProductById, deleteAllProducts } = require("../controllers/productController")
const logger = require("../middleware/loggerMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const productValidation = require("../middleware/productValidation")
const imageUpload = require("../middleware/multerMiddleware")

const router = express.Router()

router.get("/", getAllProducts)
router.delete("/", deleteAllProducts)
router.get("/:id", logger, getProductById)
router.delete("/:id", authMiddleware, deleteProductById)
router.post("/", imageUpload, productValidation, createProduct)
router.put("/:id", productValidation, updateProductById)


module.exports = router