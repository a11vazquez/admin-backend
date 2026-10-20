import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, modifyProduct } from "../controllers/product.controller.js";
const router = Router();


router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.delete("/:id", deleteProductById);

router.put("/", modifyProduct);

export default router;