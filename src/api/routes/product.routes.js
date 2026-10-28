import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, modifyProduct } from "../controllers/product.controller.js";
import { validateId, validateProductFields } from "../middlewares/middlewares.js";
const router = Router();


router.get("/", getProducts);

router.get("/:id", validateId, getProductById);

router.post("/", validateProductFields, createProduct);

router.delete("/:id", validateId, deleteProductById);

router.put("/", validateProductFields, modifyProduct);

export default router;