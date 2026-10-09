import connection from "../database/db.js";

const selectAllProducts = async () =>{
    const sql = "SELECT * FROM products";
    return connection.query(sql);
};

const selectProductWhereId = async (id) =>{
    const sql = "SELECT * FROM products WHERE id = ?";
    const [rows] = await connection.query(sql,[id]);
    return rows[0] || null;
};

const insertProduct = async (name, image, price, category) =>{
    const query = "INSERT INTO products (name, img, price, category) VALUES (?, ?, ?, ?)";
    const [rows] = await connection.query(query, [name, image, price, category]);
    return rows.insertId || null;
};

const updateProduct = async (name, image, price, category, id) =>{
    const sql = "DELETE FROM products WHERE id = ?";
    const [rows] = await connection.query(sql,[name, image, price, category, id]);
    return rows.affectedRows || null;
};

const deleteProduct = async (id) =>{
    const sql = "DELETE FROM products WHERE id = ?";
    const [rows] = await connection.query(sql, [id]);
    return rows.affectedRows || null;
};

export default {
    selectAllProducts,
    insertProduct,
    updateProduct,
    deleteProduct
};

