import pool from '../db.js';

export async function getAllUsers() {
    const result = await pool.query('SELECT * FROM USERS WHERE IS_DELETED = FALSE');
    return result.rows;
}

export async function getUserById(id){
    const result = await pool.query(`SELECT * FROM USERS WHERE ID = $1 AND IS_DELETED = FALSE LIMIT 1`,[id]);
    return result.rows;
}

export async function addUser(firstName, lastName, userName, password, email){
    const result = await pool.query(`INSERT INTO USERS (first_name, last_name, user_name, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING ID`, [firstName, lastName, userName, password, email] )

    return result.rows;
}
export async function softDeleteUser(id){
    const result = await pool.query(`UPDATE USERS SET IS_DELETED = TRUE WHERE ID = $1`, [id]);
    return result.rows;
}

