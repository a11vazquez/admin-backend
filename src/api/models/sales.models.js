import connection from "../database/db.js";

const insertSale = async (totalPrice, name, email, phone) => {
    const sqlSale = "INSERT INTO sale (totalPrice, name, email, phone) VALUES ( ? ? ? ?)"
    return connection.query(sqlSale, [totalPrice, name, email, phone]);
}

export default{
    insertSale
}