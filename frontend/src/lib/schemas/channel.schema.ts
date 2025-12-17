// modules
import { z } from "zod";
// constants
import { CHANNEL_TYPES } from "@/lib/constants/channel.constants";

export const upsertChannelSchema = z.object({
    name: z
        .string()
        .min(1, "Channel name is required")
        .max(50, "Channel name is too long")
        .trim()
        .refine((val) => val.trim().toLowerCase() !== "general", {
            message: "The 'general' channel already exists and cannot be recreated.",
        }),
    type: z.enum(CHANNEL_TYPES),
});
export type UpsertChannelSchema = z.infer<typeof upsertChannelSchema>;