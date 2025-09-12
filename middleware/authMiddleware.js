const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        let token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ success: false, msg: 'No token, authorization denied' });
        }

        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, msg: 'Token is not in "Bearer <token>" format' });
        }

        token = token.slice(7).trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user; 

        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).json({ success: false, msg: 'Token is not valid' });
    }
};