// modules
import express from "express";
// controllers
import { createServer, deleteServer, generateNewInviteCode, getAllServers, getServer, updateServer } from "@/controllers/server.controllers";
// middlewares
import { validate } from "@/middleware/validateSchema";
import { restrictTo } from "@/middleware/restrictTo";
// routers
import memberRouter from "@/routes/member.routes";
// schemas
import { upsertServerSchema } from "@/lib/schemas/server.schemas";

const router = express.Router();

router.use("/:serverId/members", memberRouter);

router
    .route("/")
    .get(getAllServers)
    .post(validate(upsertServerSchema), createServer)

router
    .route("/:serverId")
    .get(restrictTo(), getServer)
    .patch(restrictTo("ADMIN"), validate(upsertServerSchema), updateServer)
    .delete(restrictTo("ADMIN"), deleteServer)

router
    .route("/:serverId/invite-code")
    .patch(restrictTo("ADMIN"), generateNewInviteCode)

export default router;