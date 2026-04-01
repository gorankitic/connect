// modules
import express from "express";
// controllers
import { getNotifications } from "@/controllers/notification.controllers";
// middlewares
import { restrictTo } from "@/middlewares/restrictTo";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(restrictTo(), getNotifications)

export default router;
