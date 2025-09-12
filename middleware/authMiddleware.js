const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        // Get token from the Authorization header (standard practice)
        let token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ success: false, msg: 'No token, authorization denied' });
        }

        // Check if token starts with 'Bearer '
        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, msg: 'Token is not in "Bearer <token>" format' });
        }

        // Extract the token part
        token = token.slice(7).trim();

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded.user; // Directly assign the user object from the payload

        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).json({ success: false, msg: 'Token is not valid' });
    }
};