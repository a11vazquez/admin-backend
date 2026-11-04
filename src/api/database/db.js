import mysql from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;

// const pool = mysql.createPool({
//     host: database.host,
//     database: database.name,
//     user: database.user,
//     password: database.password
// });

const pool = mysql.createPool({
    host: database.host,
    port: database.port,
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