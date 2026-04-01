// modules
import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: true,
        index: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: true,
        index: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true,
        index: true
    },
    unreadCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

// Compound unique index
// For a given recipient AND sender for unique conversation in server, only ONE notification document can exist
notificationSchema.index({ recipient: 1, sender: 1, conversation: 1, server: 1 }, { unique: true });

export const Notification = model("Notification", notificationSchema);