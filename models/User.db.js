const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const endUser = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberphone: {
        type: Number,
        required: true
    },
    resetToken : {
        type:String
    },
    resetTokenExpiration :Date,
},
    { timestamps: true }
)

endUser.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

endUser.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const endUserSchema = new mongoose.model("users", endUser)

module.exports = endUserSchema