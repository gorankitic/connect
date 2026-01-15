// modules
import { model, Schema } from "mongoose";
// constants
import { MEMBER_ROLES } from "@/lib/constants/member.constants";
// types
import { IMember } from "@/lib/types/member.types";

const memberSchema = new Schema<IMember>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true,
    },
    role: {
        type: String,
        enum: MEMBER_ROLES,
        default: "GUEST"
    }
}, { timestamps: true });

memberSchema.index({ user: 1, server: 1 }, { unique: true })
memberSchema.index({ server: 1 });

export const Member = model<IMember>("Member", memberSchema);