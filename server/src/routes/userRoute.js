import express from "express";
import { login, signup, verify } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);

export default router;
