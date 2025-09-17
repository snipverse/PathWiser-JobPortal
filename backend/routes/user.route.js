import express from "express";
import { login, logout, register, updateProfile, toggleSaveJob, me } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Save/Unsave job (toggle)
router.route("/savejob/:jobId").post(isAuthenticated, toggleSaveJob);
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/me").get(isAuthenticated, me);

export default router;  
