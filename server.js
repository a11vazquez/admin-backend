/*===================
        IMPORTS
=====================*/
import express from "express"; 
import environments from "./src/api/config/environments.js";
import cors from "cors";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import { productRoutes, saleRoutes, userRoutes, viewsRoutes} from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";
import db from "./src/api/database/db.js";


/*============================== */


/*======================
      VARIABLES
=======================*/
const app = express();
const PORT = environments.PORT;
const SESSION_KEY = environments.session_key;

/*============================ */


/*====================
    EJS CONFIG
======================*/

app.set("view engine", "ejs");
app.set("views", join(_dirname, "src/views") );


//activa el sistema de layout
app.use(expressEjsLayouts);
app.set("layout", "layout/main"); //sirve un layout predeterminado a cada vista 

/*===================================== */

/*==============================
        MIDDLEWARES
=============================*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:  true}));
app.use(express.static(join(_dirname, "src/public")));
// app.use(express.static(join(__dirname, "src/public")));
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(morgan("dev"));


/*======================
        ROUTES
========================*/

app.use("/api/products", productRoutes);

app.use("/", viewsRoutes);

app.use("/api/users", userRoutes);

app.use("/api/sales", saleRoutes);
/* ========================== */

import net from "node:net";
app.get("/api/test-tcp", (req, res) => {
    const start = Date.now();

    const socket = net.createConnection({
        host: environments.database.host,
        port: Number(environments.database.port)
    });

    socket.setTimeout(8000);

    socket.on("connect", () => {
        const elapsed = Date.now() - start;

        console.log("TCP CONNECTION SUCCESS:", elapsed);

        socket.destroy();

        res.json({
            success: true,
            elapsed,
            message: "TCP connection established"
        });
    });

    socket.on("timeout", () => {
        socket.destroy();

        res.status(500).json({
            success: false,
            error: "TCP_TIMEOUT",
            elapsed: Date.now() - start
        });
    });

    socket.on("error", (error) => {
        res.status(500).json({
            success: false,
            error: error.code,
            message: error.message,
            elapsed: Date.now() - start
        });
    });
});

app.get("/api/test-db", async (req, res) => {
    const start = Date.now();

    try {
        console.log("Intentando conectar con Aiven...");

        const connection = await db.getConnection();

        console.log("Conexión establecida en:", Date.now() - start, "ms");

        const [rows] = await connection.query(
            "SELECT 1 AS connection, DATABASE() AS database_name"
        );

        connection.release();

        res.json({
            success: true,
            elapsed: Date.now() - start,
            data: rows[0]
        });

    } catch (error) {
       console.error("ERROR AIVEN:", {
        code: error.code,
        message: error.message,
        sqlMessage: error.sqlMessage,
        stack: error.stack
    });

    res.status(500).json({
        success: false,
        error: error.code,
        message: error.message
    });
    }
});
// En local inicia el servidor normalmente.
// En Vercel no ejecuta app.listen().
if (!process.env.VERCEL) {
    app.listen(PORT || 3000, () => {
        console.log(`Server running in port: ${PORT || 3000}`);
    });
}

export default app;