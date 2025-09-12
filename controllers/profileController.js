const asyncHandler = require('express-async-handler');
const mysqlPool = require('../config/db_mysql'); 

exports.getMyProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const [rows] = await mysqlPool.execute('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(rows[0]);
});