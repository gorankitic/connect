// modules
import { model, Schema } from "mongoose";

const serverSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 50
    },
    avatarUuid: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

serverSchema.index({ owner: 1 });

export const Server = model("Server", serverSchema);