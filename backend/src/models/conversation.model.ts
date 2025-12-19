// modules
import { model, Schema, Types } from "mongoose";

const conversationSchema = new Schema({
    server: {
        type: Types.ObjectId,
        ref: "Server",
        required: true
    },
    memberOne: {
        type: Types.ObjectId,
        ref: "Member",
        required: true
    },
    memberTwo: {
        type: Types.ObjectId,
        ref: "Member",
        required: true
    },
}, { timestamps: true });

// Ensure one and only one DM conversation for a pair of members: write-time normalization
// Users can start a DM in either direction:
// 1) A starts DM with B → created pair of memebers (A, B)
// 2) B starts DM with A → created pair of memebers (B, A)
// If stored “as-is”, MongoDB thinks those are different documents → duplicates
// So hook forces a rule: Always store the smaller id first, bigger id second
// That makes unique index work correctly
conversationSchema.pre("validate", function (next) {
    if (!this.memberOne || !this.memberTwo) return next();
    // We convert both ObjectIds to strings and compare them lexicographically
    // This swaps the two fields so the smaller id becomes memberOne
    if (this.memberOne.toString() > this.memberTwo.toString()) {
        [this.memberOne, this.memberTwo] = [this.memberTwo, this.memberOne];
    }
    next();
});

conversationSchema.index({ server: 1, memberOne: 1, memberTwo: 1 }, { unique: true });

export const Conversation = model("Conversation", conversationSchema);