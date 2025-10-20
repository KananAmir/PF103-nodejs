const express = require("express")
const { getAllCategories, getCategoryById, deleteCategoryById, createCategory, updateCategoryById } = require("../controllers/categoryController")

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:id", getCategoryById)
router.delete("/:id", deleteCategoryById)
router.post("/", createCategory)
router.put("/:id", updateCategoryById)


module.exports = router