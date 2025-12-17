// lib
import { Crown, ShieldCheck, type LucideIcon } from "lucide-react";

export const MEMBER_ROLES = ["ADMIN", "MODERATOR", "GUEST"] as const;

export type MemberRole = typeof MEMBER_ROLES[number];

export const MEMBER_ROLE_ICON_MAP: Partial<Record<MemberRole, LucideIcon>> = {
    ADMIN: Crown,
    MODERATOR: ShieldCheck,
};