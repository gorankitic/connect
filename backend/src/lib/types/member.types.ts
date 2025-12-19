// constants
import { MEMBER_ROLES } from "@/lib/constants";
// types
import { Types } from "mongoose";

export type MemberRole = typeof MEMBER_ROLES[number];

export interface IMember extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    server: Types.ObjectId;
    role: MemberRole;
}