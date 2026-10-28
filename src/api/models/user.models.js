import pool from "../database/db.js";

const insertUser =  (name, email, password) =>{
      const sql = "INSERT INTO users (name,email,password) VALUES (?, ?, ?)";

        return pool.query(sql,[name,email,password])
}

const findUserByEmail =  async (email) =>{
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql,[email]);
    return rows || null;
}
export default  {
    insertUser,
    findUserByEmail
};