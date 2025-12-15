// modules
import express from "express";
// controllers
import { getServerMembers, removeMember, updateMemberRole } from "@/controllers/member.controllers";
// middlewares
import { restrictTo } from "@/middleware/restrictTo";
import { validate } from "@/middleware/validateSchema";
// schemas
import { updateMemberRoleSchema } from "@/lib/schemas/member.schemas";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(restrictTo("ADMIN"), getServerMembers)

router
    .route("/:memberId")
    .patch(restrictTo("ADMIN"), validate(updateMemberRoleSchema), updateMemberRole)
    .delete(restrictTo("ADMIN"), removeMember);

export default router;
