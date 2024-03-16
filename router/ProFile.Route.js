const express = require("express")
const router = express.Router()

const checkUserProfile = require("../controllers/ProFile.Controller")
router.get("/" , checkUserProfile.getUserId)

module.exports = router