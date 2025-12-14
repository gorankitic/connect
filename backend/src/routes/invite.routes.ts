// modules
import express from "express";
// controllers
import { joinServer } from "@/controllers/invite.controllers";

const router = express.Router();

router.post("/:inviteCode", joinServer)

export default router;
