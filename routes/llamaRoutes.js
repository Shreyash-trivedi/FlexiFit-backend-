import express from "express";
import { chat, struct } from "../controllers/llamaControllers.js";

const router = express.Router();

router.post("/chat", chat);
router.post("/struct", struct);

export default router;
