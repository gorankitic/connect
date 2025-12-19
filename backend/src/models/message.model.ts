// modules
import { model, Schema } from "mongoose";
// utils
import { AppError } from "@/lib/utils/AppError";

const messageSchema = new Schema({
    content: {
        type: String,
        maxLength: 1000,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        default: null,
        index: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        default: null,
        index: true
    },
    deletedAt: {
        type: Date,
        default: null,
        index: {
            expires: 60 * 60 * 24 * 30
        }
    }
}, { timestamps: true });

// Compound indexes, pre-sorted lookup collections
// Store messages grouped by channel, and within each channel, already sorted by createdAt
// Used on queries Message.find({ channel: channelId }).sort({ createdAt: 1 });
messageSchema.index({ channel: 1, createdAt: 1 });
// Store messages grouped by conversation, and within each conversation, already sorted by createdAt
// Used on queries Message.find({ conversation: conversationId }).sort({ createdAt: 1 });
messageSchema.index({ conversation: 1, createdAt: 1 });

// Enforce: message belongs to EITHER channel OR conversation
messageSchema.pre("validate", function (next) {
    const hasChannel = !!this.channel;
    const hasConversation = !!this.conversation;

    if (hasChannel === hasConversation) {
        return next(new AppError("Message must belong to either a channel or a conversation", 400));
    }

    next();
});

export const Message = model("Message", messageSchema);