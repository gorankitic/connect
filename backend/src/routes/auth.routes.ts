// modules
import express from "express";
// controllers
import { forgotPassword, refresh, resetPassword, signIn, signOut, signOutAll, signUp, updatePassword, verification } from "src/controllers/auth.controllers";
// schemas
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema, updatePasswordSchema } from "src/lib/schemas/auth.schemas";
// middlewares
import { validate } from "@/middlewares/validateSchema";
import { protect } from "@/middlewares/protect";
import { authRateLimiter, sensitiveRateLimiter } from "@/middlewares/rateLimiters";

const router = express.Router();

router
    .post("/signup", authRateLimiter, validate(signupSchema), signUp)
    .post("/signin", authRateLimiter, validate(signinSchema), signIn)
    .post("/refresh", refresh)
    .post("/signout", protect, signOut)
    .post("/signoutall", protect, signOutAll)
    .post("/forgot-password", sensitiveRateLimiter, validate(forgotPasswordSchema), forgotPassword)
    .patch("/reset-password", sensitiveRateLimiter, validate(resetPasswordSchema), resetPassword)
    .patch("/update-password", protect, sensitiveRateLimiter, validate(updatePasswordSchema), updatePassword)
    .get("/verification", verification)

export default router;