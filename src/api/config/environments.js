import dotenv from "dotenv";
dotenv.config();

export default{
    PORT: process.env.PORT,
    database:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        sslCa: process.env.DB_SSL_CA
    },
    session_key: process.env.SESSION_KEY
};