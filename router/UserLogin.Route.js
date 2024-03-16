const express = require("express")
const router = express.Router()

const userLoginController = require("../controllers/UserLogin.controller")
router.post("/" , userLoginController.UserLogin)

module.exports = router