const contentdb = require("../models/Status.db")

exports.getAllContent = async (req, res) => {
    const listContent = await contentdb.find()
    res.status(200).json(listContent)
}

exports.deleToken = async (req, res) => {
    res.clearCookie('userToken')
    res.status(200).json({ message: "Đăng xuất thành công" })
}

exports.searchByCategories = async (req, res) => {
    const searchCategories = req.query.categories;

    try {
        const searchResults = await contentdb.find(searchCategories);
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Không có dữ liệu:', error);
        res.status(500).json({ error: 'Dữ liệu không tồn tại' });
    }
};