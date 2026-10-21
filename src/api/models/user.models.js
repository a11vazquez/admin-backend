import connection from "../database/db.js";

const insertUser =  (name, email, password) =>{
      const sql = "INSERT INTO users (name,email,password) VALUES (?, ?, ?)";

        return connection.query(sql,[name,email,password])
}

const findUserByEmail =  async (email) =>{
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.query(sql,[email]);
    return rows || null;
}
export default  {
    insertUser,
    findUserByEmail
};