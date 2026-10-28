import pool from "../database/db.js";

const insertSale = async (connection, totalPrice, name, email, phone) => {
    const sqlSale = "INSERT INTO sales (total_Price, name, email, phone) VALUES ( ?, ?, ?, ?)"
    return connection.query(sqlSale, [totalPrice, name, email, phone]);
}

const insertProductSale = async (connection, arrayIds, saleId) =>{
    const ids = arrayIds.map(productId => [productId, saleId]);
    return connection.query('INSERT INTO product_sales (id_product, id_sale) VALUES ?', [ids]);
};

export default{
    insertSale,
    insertProductSale
}