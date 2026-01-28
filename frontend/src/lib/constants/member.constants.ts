// lib
import { Crown, ShieldCheck, type LucideIcon } from "lucide-react";
// types
import type { MemberRole } from "@/lib/types/member.types";

export const MEMBER_ROLE = {
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
    GUEST: "GUEST"
} as const;

export const MEMBER_ROLE_ICON_MAP: Partial<Record<MemberRole, LucideIcon>> = {
    ADMIN: Crown,
    MODERATOR: ShieldCheck,
};