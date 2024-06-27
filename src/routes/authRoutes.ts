import express from "express";
const router = express.Router();

// Importing controllers
import SendCodeController from "../controllers/auth/SendCodeController";
import VerifyCodeController from "../controllers/auth/VerifyCodeController";

// Controllers
const sendCodeController = new SendCodeController();
const verifyCodeController = new VerifyCodeController();

// Routes
router.post("/send-code", sendCodeController.handle);
router.post("/verify-code", verifyCodeController.handle);

export default router;
