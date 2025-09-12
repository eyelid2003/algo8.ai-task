const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysqlPool = require('../config/db_mysql'); 

// SIGNUP
const signup = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await mysqlPool.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );

    const userId = result.insertId.toString();

    // JWT payload
    const payload = { user: { id: userId } };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.status(201).json({ 
        success: true, 
        token, 
        user: { id: userId, name, email } 
    });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id.toString() } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.status(200).json({ 
        success: true, 
        token, 
        user: { id: user.id.toString(), name: user.name, email: user.email } 
    });
});

module.exports = {
    signup,
    login,
};
