import { viewProducts } from "../controllers/views.controller.js";
import { Router } from "express";
import productModels from "../models/product.models.js";
import userModels from "../models/user.models.js";
import { hashPassword, comparePassword } from "../utils/bycript.js";
import { sessionValidate } from "../middlewares/middlewares.js";

const router = Router();

router.get("/panel", sessionValidate, viewProducts);

router.get("/search", sessionValidate, async (req, res) => {
        res.render("search", {
                title: "Buscar Por ID"
        });
});
router.get("/create", sessionValidate, async (req, res) => {
        res.render("create", {
                title: "Crear Producto",
                about: "Producto",
        });
});

router.get("/modify", sessionValidate, async (req, res) => {
        res.render("modify", {
                title: "Modificar Producto",
                product: null
        });
});

router.get("/modify/:id", sessionValidate, async (req, res) => {
        const product = await productModels.selectProductWhereId(req.params.id);
        if (product) {
                res.render("modify", {
                        title: "Modificar Producto",
                        product: product
                });
        }
});

router.get("/delete", sessionValidate, async (req, res) => {
        res.render("delete", {
                title: "Eliminar Producto",
                product: null
        });
});

router.get("/delete/:id", sessionValidate, async (req, res) => {
        const product = await productModels.selectProductWhereId(req.params.id);
        if (product) {
                res.render("delete", {
                        title: "Eliminar Producto",
                        product: product
                });
        }
});

/*===============
      LOGIN
================*/
router.get("/login", async (req, res) => {
        res.render("login", {
                title: "Login Panel",
                layout: "layout/auth"
        });
});

router.post("/login", async (req, res) => {
        try {
                //destructuring de datos desde el body
                const { name, email, password } = req.body;

                //validacion de campos
                if (!name || !email || !password) {
                        return res.render("login", {
                                title: "Login",
                                error: "Todos los campos son necesarios",
                                layout: "layout/auth"
                        });
                }

                //SIN BCRYPT
                ///1. ver que exista un usuario con el name y, password recibidos.
                // const sql = "SELECT * FROM users WHERE name = ? AND email = ? AND password = ?"; 
                // const [rows] = await connection.query(sql, [name, email, password]);

                //Con bcrypt, 1. solo traemos el email
                const rows = await userModels.findUserByEmail(email);

                //si no retorno nada es por que no existe el usuario en la BDD, retornamos el login con mensaje de error
                if (!rows.length) {
                        return res.render("login", {
                                title: "Login",
                                error: "Usuario Admin No Encontrado",
                                layout: "layout/auth"
                        });
                }

                const user = rows[0];// guardamos el objeto usuario recibido de la BDD


                //con logica separada utils/bycrypt.js
                const matching = await comparePassword(password, user.password);

                console.log("PASSWORD IGUAL? : ", matching);
                if (matching) {
                        //guardamos la session
                        req.session.user = {
                                id: user.id,
                                userName: user.name,
                                email: user.email
                        }

                        //Una vez guardado el usuario y, la session, redireccionamos al dashboard
                        res.redirect("/panel");
                } else {
                        return res.render("login", {
                                title: "Login",
                                error: "contraseña incorrecta",
                                layout: "layout/auth"
                        })
                }

        } catch (error) {
                console.log("ERROR EN EL LOGIN : ", error);
                res.status(500).json({
                        error: "error interno en el servidor LOGIN"
                });
        }
});


router.post("/logout", (req, res) => {
        req.session.destroy((err) => {
                if (err) {
                        console.log("Error al destruir la session : ", err);
                        return res.status(500).json({
                                error: "Error al cerrar la session"
                        });
                }
        });
        res.redirect("/login");
});

export default router;