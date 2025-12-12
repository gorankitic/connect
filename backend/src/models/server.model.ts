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
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

serverSchema.index({ owner: 1 });

// Parent referencing: Parent (Server) doesn't know about children (Channels)
// Virtual populate parent (Server) with children (Channels)
// Virtual field "channels" is not stored into Server document, it is populated on Server query
serverSchema.virtual("channels", {
    ref: "Channel",
    localField: "_id",
    foreignField: "server"
});

export const Server = model("Server", serverSchema);