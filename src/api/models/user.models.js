import connection from "../database/db.js";

const insertUser =  (name, email, password) =>{
      const sql = "INSERT INTO users (name,email,password) VALUES (?, ?, ?)";

        return connection.query(sql,[name,email,password])
}

const findUserByEmail =  async (email) =>{
    const sql = "SELECT * FROM users WHERE email = ?";
    return  await connection.query(sql,[email]);
}
export default  {
    insertUser,
    findUserByEmail
};