import { viewProducts } from "../controllers/views.controller.js";
import { Router } from "express";

const router = Router();

router.get("/panel", viewProducts);

export default router;