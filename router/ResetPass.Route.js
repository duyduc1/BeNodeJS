const express = require("express")
const router = express.Router()

const ResetPass = require("../controllers/ResetPass.Controller")
router.post("/:id/:token" , ResetPass.postResetPassword)

module.exports = router