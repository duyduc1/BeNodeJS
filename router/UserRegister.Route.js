const express = require('express')
const router = express.Router()

const endUserController = require("../controllers/UserRegister.controller")
router.post("/" , endUserController.postRegisterUser)

module.exports = router