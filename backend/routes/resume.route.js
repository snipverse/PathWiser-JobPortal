import express from "express";
import { uploadResume } from "../controllers/resume.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Resume upload endpoint
router.post("/upload", isAuthenticated, singleUpload, uploadResume);

export default router;
