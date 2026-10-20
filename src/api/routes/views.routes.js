import { viewProducts } from "../controllers/views.controller.js";
import { Router } from "express";
import productModels from "../models/product.models.js";

const router = Router();

router.get("/panel", viewProducts);

router.get("/search", async (req, res) =>{
    res.render("search",{
        title: "Buscar Por ID"
    });
});
router.get("/create" ,async (req, res) =>{
        res.render("create", {
                title: "Crear Producto",
                about: "Producto",
        });
});

router.get("/modify" ,async (req, res) =>{
        res.render("modify", {
                title: "Modificar Producto",
                product: null
        });
});

router.get("/modify/:id" ,async (req, res) =>{
        const product = await productModels.selectProductWhereId(req.params.id);
        if(product){
                res.render("modify", {
                        title: "Modificar Producto",
                        product: product
                });
        }
});

router.get("/delete" ,async (req, res) =>{
        res.render("delete", {
                title: "Eliminar Producto",
                product: null
        });
});

router.get("/delete/:id" ,async (req, res) =>{
        const product = await productModels.selectProductWhereId(req.params.id);
        if(product){
                res.render("delete", {
                        title: "Eliminar Producto",
                        product: product
                });
        }
});

router.get("/login", async(req, res) =>{
        res.render("login",{
                title: "login dashboard"
        });
});

export default router;