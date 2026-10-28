import { Router } from "express";
import { insertSale } from "../controllers/sales.controller.js";
import { validateSaleFields } from "../middlewares/middlewares.js";
const router = Router();

router.post("/", validateSaleFields ,insertSale);

export default router;