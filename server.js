/*===================
        IMPORTS
=====================*/
import express from "express"; 
import environments from "./src/api/config/environments.js";
import cors from "cors";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import { productRoutes, userRoutes, viewsRoutes } from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";



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
/* ========================== */



app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});