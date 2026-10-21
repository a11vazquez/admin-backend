import { Router } from "express";
import { insertUser } from "../controllers/user.controller.js";
const router = Router();

router.post("/", insertUser);
export default router;