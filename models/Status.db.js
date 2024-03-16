const mongoose = require("mongoose")

const uploadStatus = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy:{
        type: String
    },
},
    { timestamps: true }
)

const userUploadStatusSchema = new mongoose.model("contents" , uploadStatus)

module.exports = userUploadStatusSchema