const jwt = require('jsonwebtoken');
const User = require("../models/User.db");

function checkTokenBelongsToUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Không có token" });
    }

    jwt.verify(token, 'secret-key' , (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        req.user = { id: decoded.userId };
        next();
    });
}

exports.getUserId = async (req, res) => {
    checkTokenBelongsToUser(req, res, async () => {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId }).select("-password -token");
        if(user){
            res.status(200).json(user);
        }else{
            res.status(500).json({ error: 'Lỗi server' });
        }  
    });
};
