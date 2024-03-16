const express = require("express")
const router = express.Router()

const upLoadStatusController = require("../controllers/UploadStatus.Controller")
router.get("/" , upLoadStatusController.getStatus)
router.post("/" , upLoadStatusController.postStatusUser)
router.put("/:id" , upLoadStatusController.updateStatus)
router.delete("/:id" , upLoadStatusController.deleteStatus)

module.exports = router