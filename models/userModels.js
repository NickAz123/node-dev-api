import pool from '../db.js';

export async function getAllUsers() {
    const result = await pool.query('SELECT * FROM USERS WHERE IS_DELETED = FALSE');
    return result.rows;
}

export async function getUserById(id){
    const result = await pool.query(`SELECT * FROM USERS WHERE ID = $1 AND IS_DELETED = FALSE LIMIT 1`,[id]);
    return result.rows;
}


