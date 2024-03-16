const express = require("express")
const router = express.Router()

const HomeController = require("../controllers/Home.Controller")
const checkUser = require("../middleware/authUser.Middleware")
router.get("/" , checkUser.checkUser,HomeController.getAllContent)
router.post("/" , HomeController.deleToken)
router.get("/" , HomeController.searchByCategories)

module.exports = router