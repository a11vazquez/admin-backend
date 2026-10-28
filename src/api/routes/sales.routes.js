import { Router } from "express";
import { insertSale } from "../controllers/sales.controller.js";
const router = Router();

router.post("/", insertSale);

export default router;