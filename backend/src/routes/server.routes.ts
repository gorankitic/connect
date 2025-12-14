// modules
import express from "express";
// controllers
import { createServer, generateNewInviteCode, getAllServers, getServer, updateServer } from "@/controllers/server.controllers";
// middlewares
import { validate } from "@/middleware/validateSchema";
import { restrictTo } from "@/middleware/restrictTo";
// schemas
import { upsertServerSchema } from "@/lib/schemas/server.schemas";

const router = express.Router();

router
    .route("/")
    .get(getAllServers)
    .post(validate(upsertServerSchema), createServer)

router
    .route("/:serverId")
    .get(restrictTo(), getServer)
    .patch(restrictTo("ADMIN"), validate(upsertServerSchema), updateServer)

router
    .route("/:serverId/invite-code")
    .patch(restrictTo("ADMIN"), generateNewInviteCode)

export default router;