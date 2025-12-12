// modules
import { model, Schema } from "mongoose";

const memberSchema = new Schema({
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
        enum: ["ADMIN", "MODERATOR", "GUEST"],
        default: "GUEST"
    }
}, { timestamps: true });

memberSchema.index({ user: 1, server: 1 }, { unique: true })
memberSchema.index({ server: 1 });

export const Member = model("Member", memberSchema);