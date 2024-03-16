const User = require('../models/User.db')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "duyduc.tesop@gmail.com",
        pass: "qutirnowlbvwpued",
    },
});
exports.postResetPassword = async (req, res) => {
    const newPassword = req.body.newPassword;
    const userId = req.params.id;
    const token = req.params.token;

    const user = await User.findOne({
        _id: userId,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
        return res.status(401).json({ error: "người dùng không tồn tại" });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    try {
        return res.status(203).json({ message: 'Đổi mật khẩu thành công' })
    } catch (err) {
        console.error('Không thể đổi mật khẩu:', err);
        res.status(500).json({ error: 'Không thể đổi mật khẩu' });
    }
}
