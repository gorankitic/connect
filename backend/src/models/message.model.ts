// modules
import { model, Schema, Types } from "mongoose";

interface IMessage {
    content: string,
    sender: Types.ObjectId,
    server: Types.ObjectId,
    channel?: Types.ObjectId | null,
    conversation?: Types.ObjectId | null
}

const messageSchema = new Schema<IMessage>({
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
        default: null
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        default: null
    }
}, { timestamps: true });

messageSchema.index({ channel: 1, createdAt: 1 });

messageSchema.index({ conversation: 1, createdAt: 1 });

export const Message = model<IMessage>("Message", messageSchema);