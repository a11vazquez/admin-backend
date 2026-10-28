import pool from "../database/db.js";

const selectAllProducts = async () =>{
    const sql = "SELECT * FROM products";
    return pool.query(sql);
};

const selectProductWhereId = async (id) =>{
    const sql = "SELECT * FROM products WHERE id = ?";
    const [rows] = await pool.query(sql,[id]);
    return rows[0] || null;
};

const selectProductWhereNameAndCategory = async (name, category) =>{
    const sql = "SELECT * FROM products WHERE name = ? AND category = ?";
    const [rows] = await pool.query(sql,[name, category]);
    return rows[0] || null;
};

const insertProduct = async (name, image, price, stock, category) =>{
    const query = "INSERT INTO products (name, img, price, stock, category) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.query(query, [name, image, price, stock, category]);
    return rows.insertId || null;
};

const updateProduct = async (name, image, price, stock,  category, id) =>{
     const sql = "UPDATE products set name = ?, img = ?, price = ?, stock = ?, category = ? WHERE id = ?";
    const [rows] = await pool.query(sql,[name, image, price, stock, category, id]);
    return rows.affectedRows || null;
};

const deleteProduct = async (id) =>{
    const sql = "DELETE FROM products WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows.affectedRows || null;
};

export default {
    selectAllProducts,
    selectProductWhereId,
    selectProductWhereNameAndCategory,
    insertProduct,
    updateProduct,
    deleteProduct
};

