const User = require("../models/User.db")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "duyduc.tesop@gmail.com",
        pass: "qutirnowlbvwpued",
    },
});

exports.postForgotPass = (async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    if (user) {
        const token = crypto.randomBytes(20).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000
        await user.save()

        const resetUrl = `http://localhost:4200/resetpass/${user._id}/${token}`;
        const mailOptions = {
            from: "duyduc.tesop@gmail.com",
            to: user.email,
            subject: 'Password Reset Request',
            html: `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
          `,
        };
        try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'Gửi Yêu cầu thành công' });
        } catch (err) {
            console.log(err);
            console.error('Gửi Yêu Cầu Thất Bại');
            res.status(500).json({ error: 'Failed to send password reset email' });
        }
    };
})