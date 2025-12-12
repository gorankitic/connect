// modules
import express from "express";
// controllers
import { getUploadcareSignature } from "src/controllers/upload.controllers";
// middlewares
import { uploadRateLimiter } from "src/middleware/rateLimiters";

const router = express.Router();

router
    .get("/signature", uploadRateLimiter, getUploadcareSignature)


export default router;