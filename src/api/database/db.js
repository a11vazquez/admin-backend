import mysql from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;

console.log("SSL:", {
    caLength: database.sslCa?.length,
    caHeader: database.sslCa?.slice(0, 27),
    caFooter: database.sslCa?.trim().slice(-25),
    host: database.host,
    port: Number(database.port)
});

const pool = mysql.createPool({
    host: database.host,
    port: Number(database.port),
    database: database.name,
    user: database.user,
    password: database.password,

    ssl: {
        ca: database.sslCa, //cifrado del servidor
        rejectUnauthorized: true // que no acepte si no lo identifica
    },

    waitForConnections: true,
    connectionLimit: 5, //5 conexiones maximo, la sexta espera una que se libere una.
    queueLimit: 0
});
export default pool;

// const pool = mysql.createPool({
//     host: database.host,
//     database: database.name,
//     user: database.user,
//     password: database.password
// });