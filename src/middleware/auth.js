const jwt = require('jsonwebtoken');

module.exports = {
    registration: (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).json({
                error: 'Email is required'
            });
        } else if (!req.body.password) {
            return res.status(400).json({
                error: 'Password is required'
            });
        }
        next();
    },
    login: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token, process.env.SECRET);
            req.userData = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                msg: 'No token, authorization denied'
            });
        }
    }
}
