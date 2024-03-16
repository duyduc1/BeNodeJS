const User = require("../models/User.db");
exports.postRegisterUser = async (req, res) => {
    try {
        const { username, password, email, numberphone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được đăng ký, xin vui lòng dùng mail khác" });
        }
        const newUser = new User({ username,password: password, email, numberphone });
        await newUser.save();
        res.status(200).json({"status": 200});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Không thể đăng ký" });
    }
};

