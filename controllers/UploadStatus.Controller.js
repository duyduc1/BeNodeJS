const Contentdb = require("../models/Status.db");
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Không có token' });
    }
    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Tokeen không hợp lệ' });
        }
        req.user = { id: decoded.userId };
        next();
    });
}

exports.getStatus = async (req, res) => {
    authenticateToken(req, res, async () => {
        const statusId = req.user.id;
        const status = await Contentdb.find({ createdBy: statusId });

        if (status.length > 0 ) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ message: 'Không tìm thấy dữ liệu người dùng' });
        }
    });
};

exports.postStatusUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Không có token' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
        jwt.verify(token, 'secret-key', async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Không thể đăng bài' });
            }
            const userId = decoded.userId;
            const dataContent = {
                categories: req.body.categories,
                content: req.body.content,
                createdBy: userId,
            };
            const newContent = new Contentdb(dataContent);
            const result = await newContent.save();
            res.status(200).send("Content Lưu thành công");
        });
    } catch (error) {
        console.error('Lỗi không lưu được content', error);
        res.status(500).send("Content không thể lưu");
    }
};

exports.updateStatus = async (req, res) => {
    authenticateToken(req, res, async () => {
        const userId = req.user.id;
        const statusId = req.params.id; 
        try {
            const status = await Contentdb.findOne({ _id: statusId, createdBy: userId });
            if (!status) {
                return res.status(404).json({ message: 'Không thể cập nhật' });
            }
            status.categories = req.body.categories;
            status.content = req.body.content;
            const updatedStatus = await status.save();
            res.status(200).json(updatedStatus);
        } catch (error) {
            console.error('Lỗi', error);
            res.status(500).json({ error: 'Lỗi' });
        }
    });
};

exports.deleteStatus = async (req, res) => {
    authenticateToken(req, res, async () => {
        const userId = req.user.id;
        const statusId = req.params.id;
        try {
            const status = await Contentdb.findOne({ _id: statusId, createdBy: userId });
            if (!status) {
                return res.status(404).json({ message: 'Không tìm thấy bài viết người dùng' });
            }
            await status.deleteOne();
            res.status(200).json({ message: 'Xoá thành công bài viết' });
        } catch (error) {
            console.error('Lỗi server', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    });
};