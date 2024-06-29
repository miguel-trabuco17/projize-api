import express from "express";
import SendCodeController from "../controllers/auth/SendCodeController";
import VerifyCodeController from "../controllers/auth/VerifyCodeController";

const router = express.Router();

// Controllers
const sendCodeController = new SendCodeController();
const verifyCodeController = new VerifyCodeController();

// Routes
router.post("/send-code", sendCodeController.handle);
router.post("/verify-code", verifyCodeController.handle);

export default router;
