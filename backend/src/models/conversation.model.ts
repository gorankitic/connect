// modules
import { model, Schema, Types } from "mongoose";

interface IConversation {
    server: Types.ObjectId,
    participants: Types.ObjectId[],
}

const conversationSchema = new Schema<IConversation>({
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: true
    }]
}, { timestamps: true });

// Prevent two Conversation documents with same pair of members
conversationSchema.index({ participants: 1, server: 1 }, { unique: true });
conversationSchema.index({ participants: 1 });

// Sorting the participants ensures MongoDB sees both [A, B] and [B, A] as the same unique conversation and prevents duplicates
conversationSchema.pre("save", function (next) {
    this.participants = this.participants
        .map(id => id.toString())
        .sort()
        .map(id => new Types.ObjectId(id));
    next();
});

// Ensure exactly 2 participants
conversationSchema
    .path("participants")
    .validate(function (value: any[]) {
        return value.length === 2;
    }, "A conversation must contain exactly two participants.");

export const Conversation = model<IConversation>("Conversation", conversationSchema);