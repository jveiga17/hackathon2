// database-related operations for user management (in db)
const pool = require('../db/database');

class User {
    static async createUser(username, hashedPassword) {
        try {
          const result = await pool.query(      // .query() from 'pg' library
            'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
          );
      
          console.log('User created in the database:', result.rows[0]);     // first row of result set
      
          return result.rows[0];
        } catch (error) {
          console.error('Error during user creation:', error);
          throw error; // rethrow the error to be caught by the calling function
        }
      }
      
    static async getUserByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getUserById(userId) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

// exporting
module.exports = User;