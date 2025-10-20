const express = require("express")
const { getAllUsers, getUserById, deleteUserById } = require("../controllers/userController")
const { register, login } = require("../controllers/authController")

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.delete("/:id", deleteUserById)
router.post("/register", register)
router.post("/login", login)


module.exports = router