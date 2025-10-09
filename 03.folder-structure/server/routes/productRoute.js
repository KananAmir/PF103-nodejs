const express = require("express")
const { getAllProducts, getProductById, deleteProductById, createProduct, updateProductById } = require("../controllers/productController")
const logger = require("../middleware/loggerMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const productValidation = require("../middleware/productValidation")

const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", logger, getProductById)
router.delete("/:id", authMiddleware, deleteProductById)
router.post("/", productValidation, createProduct)
router.put("/:id", productValidation, updateProductById)


module.exports = router