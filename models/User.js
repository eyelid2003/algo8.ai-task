const pool = require('../config/db_mysql');
const bcrypt = require('bcryptjs'); 

const User = {
    create: async ({ name, email, password }) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.execute( 
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    findByEmail: async (email) => {
        try {
            const [rows] = await pool.execute( 
                'SELECT id, name, email, password FROM users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.execute( 
                'SELECT id, name, email FROM users WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }
};

module.exports = User;