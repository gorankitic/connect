// modules
import { model, Schema } from "mongoose";
// constants
import { CHANNEL_TYPES } from "@/lib/constants";

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 50
    },
    type: {
        type: String,
        enum: CHANNEL_TYPES,
        default: "TEXT"
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true,
    }
}, { timestamps: true });

channelSchema.index({ server: 1 });

export const Channel = model("Channel", channelSchema);