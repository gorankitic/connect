// utils
import { AppError } from "@/lib/utils/AppError";
import { catchAsync } from "@/lib/utils/catchAsync";
// types
import { MemberRole } from "@/lib/types/member.types";
// services
import { assertServerMember } from "@/services/member.services";

export const restrictTo = (...allowedRoles: MemberRole[]) => {
    return catchAsync(async (req, res, next) => {
        if (!req.user) {
            throw new AppError("Not authenticated", 401);
        }
        const userId = String(req.user._id);
        const { serverId } = req.params;

        // 1) Check is user a member of this server
        const member = await assertServerMember({ serverId, userId });

        // 2) Attach member for next middlewares / controllers
        req.member = member;

        // 3) If route defines allowed roles, enforce them
        if (allowedRoles.length > 0 && !allowedRoles.includes(member.role)) {
            return next(new AppError("You don't have a permission for this action.", 403));
        }

        next();
    });
};