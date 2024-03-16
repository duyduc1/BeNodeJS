const express = require("express")
const router = express.Router()

const ForGotPass = require("../controllers/FotgotPass.Controller")
router.post("/" , ForGotPass.postForgotPass)

module.exports = router