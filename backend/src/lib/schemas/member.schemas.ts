// modules
import { z } from "zod";
// constants
import { MEMBER_ROLES } from "@/lib/constants/member.constants";

export const updateMemberRoleSchema = z.object({
    role: z.enum(MEMBER_ROLES),
});