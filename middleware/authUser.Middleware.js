const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'secret-key');
        return decoded;
    } catch (error) {
        return null;
    }
};

exports.checkUser = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.redirect("/login");
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.redirect("/login"); 
    }
    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        return res.redirect("/login"); 
    }
};
