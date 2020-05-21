require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
    } catch (error) {
        return res.status(401).json({
            auth: false,
            message: "Invalid Token",
        });
    }
    next();
}

module.exports = verifyToken;
