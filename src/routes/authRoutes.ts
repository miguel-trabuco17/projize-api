import express from "express";
const router = express.Router();

// Importing controllers
import SendCodeController from "../controllers/auth/sendCodeController";

// Controllers
const sendCodeController = new SendCodeController();

// Routes
router.post("/send-code", sendCodeController.handle);

export default router;
