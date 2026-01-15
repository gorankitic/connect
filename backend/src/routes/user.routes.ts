// modules
import express from "express";
// controllers
import { getUser, updateAvatar, updateData } from "src/controllers/user.controllers";
// schemas
import { updateAvatarSchema, updateDataSchema } from "src/lib/schemas/user.schemas";
// middlewares
import { validate } from "@/middlewares/validateSchema";

const router = express.Router();

router
    .get("/", getUser)
    .patch("/update-data", validate(updateDataSchema), updateData)
    .patch("/update-avatar", validate(updateAvatarSchema), updateAvatar)

export default router;