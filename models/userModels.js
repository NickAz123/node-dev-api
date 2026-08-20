import pool from '../db.js';

export async function getAllUsers() {
    const result = await pool.query('SELECT * FROM USERS WHERE IS_DELETED = FALSE');
    return result.rows;
}
