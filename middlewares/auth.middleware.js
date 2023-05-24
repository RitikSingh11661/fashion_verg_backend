const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const decoded = jwt.verify(token, "Fashion");
        if (decoded) {
            req.body.userId = decoded.userId;
            if (req.path === '/cart/add') {
                req.body.userName = decoded.userName;
                req.body.userEmail = decoded.userEmail;
            }
            next();
        } else res.status(400).send({ msg: "Login required, token is valid" });
    } else res.status(400).send({ msg: "Login required" });
}

module.exports = { verifyToken };