// modules
import express from "express";
// controllers
import { getUploadcareSignature } from "src/controllers/upload.controllers";
// middlewares
import { uploadRateLimiter } from "@/middlewares/rateLimiters";

const router = express.Router();

router
    .get("/signature", uploadRateLimiter, getUploadcareSignature)


export default router;