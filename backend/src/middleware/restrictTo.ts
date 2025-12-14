// utils
import { AppError } from "@/lib/utils/AppError";
import { catchAsync } from "@/lib/utils/catchAsync";
// types
import { MemberRole } from "@/lib/types/member.types";
// models
import { Member } from "@/models/member.model";

export const restrictTo = (...allowedRoles: MemberRole[]) => {
    return catchAsync(async (req, res, next) => {
        const userId = req.user._id;
        const { serverId } = req.params;

        // 1) Check is user a member of this server
        const member = await Member
            .findOne({ user: userId, server: serverId })
            .populate({ path: "user", select: "_id name avatarUuid" });

        if (!member) {
            return next(new AppError("You don't have a permission for this action.", 403));
        }

        // Attach member for next middlewares / controllers
        req.member = member;

        // 2) If route defines allowed roles, enforce them
        if (allowedRoles.length > 0 && !allowedRoles.includes(member.role)) {
            return next(new AppError("You don't have a permission for this action.", 403));
        }

        next();
    });
};