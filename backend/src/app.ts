// modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
// constants
import { CLIENT_ORIGIN } from "./config/env";
// middlewares
import { protect } from "./middlewares/protect";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { globalRateLimiter } from "./middlewares/rateLimiters";
import { sanitizeMongo } from "./middlewares/sanitizeMongo";
// (routers)
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import sessionRouter from "./routes/session.routes";
import uploadRouter from "./routes/upload.routes";
import serverRouter from "./routes/server.routes";
import inviteRouter from "./routes/invite.routes";
// lib
import { AppError } from "./lib/utils/AppError";

// Initialize express application
export const app = express();

// MIDDLEWARES
// 1) Trust proxy
app.set("trust proxy", true);
// 2) Cors
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
// 3) Security headers
app.use(helmet({ contentSecurityPolicy: false }));
// 4) Body parsing + size limit
app.use(express.json({ limit: "10kb" }));
// 5) Cookie parser
app.use(cookieParser());
// 6) Global rate limiter
app.use("/api", globalRateLimiter);
// 7) Sanitize request against NoSQL injection
app.use(sanitizeMongo);
// 8). Prevent HTTP parameter pollution
app.use(hpp());

// (Routers)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", protect, userRouter);
app.use("/api/v1/sessions", protect, sessionRouter);
app.use("/api/v1/uploads", protect, uploadRouter);
app.use("/api/v1/servers", protect, serverRouter);
app.use("/api/v1/invites", protect, inviteRouter);

// Catch-all for undefined routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);