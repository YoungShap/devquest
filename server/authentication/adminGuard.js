const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("User is not authorized");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(401).send("User is not authorized");
        }

        // Check if the user type is 'Admin'
        if (data.type !== 'Admin') {
            return res.status(403).send("Access forbidden. User is not an Admin.");
        }

        // If the user is an Admin, proceed to the next middleware or route handler
        next();
    });
};
