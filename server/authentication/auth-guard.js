const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send("User is not authorized");
        } else {
            next();
        }
    });
}