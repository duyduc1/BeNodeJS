const User = require("../models/User.db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.UserLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username });
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
            res.status(200).json({ "token": token })
        } else {
            res.status(403).json({ "status": 403 })
        }
    } catch (error) {
        res.status(500).json({ "status": 500 })
    }
}