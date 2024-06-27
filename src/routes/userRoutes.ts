import express from "express";
const router = express.Router();

// Importing controllers
import CreateUserController from "../controllers/user/CreateUserController";

// Controllers
const createUserController = new CreateUserController();

// Routes
router.post("/create-user", createUserController.handle);

export default router;
