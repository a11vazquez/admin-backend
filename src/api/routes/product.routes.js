import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, modifyProduct } from "../controllers/product.controller.js";
import { validateCamps, validateId } from "../middlewares/middlewares.js";
const router = Router();


router.get("/", getProducts);

router.get("/:id", validateId, getProductById);

router.post("/", createProduct);

router.delete("/:id", validateId, deleteProductById);

router.put("/", validateCamps, modifyProduct);

export default router;