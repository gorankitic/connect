// modules
import express from "express";
// controllers
import { createServer, getAllServers, getServer } from "@/controllers/server.controllers";
// middlewares
import { validate } from "@/middleware/validateSchema";
import { restrictTo } from "@/middleware/restrictTo";
// schemas
import { createServerSchema } from "@/lib/schemas/server.schemas";

const router = express.Router();

router
    .get("/", getAllServers)
    .get("/:serverId", restrictTo(), getServer)
    .post("/", validate(createServerSchema), createServer)

export default router;