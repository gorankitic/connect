// modules
import { z } from "zod";
// constants
import { CHANNEL_TYPE } from "@/lib/constants/channel.constants";
// types
import type { ChannelType } from "../types/channel.types";

export const upsertChannelSchema = z.object({
    name: z
        .string()
        .min(1, "Channel name is required")
        .max(50, "Channel name is too long")
        .trim()
        .refine((val) => val.trim().toLowerCase() !== "general", {
            message: "The 'general' channel already exists and cannot be recreated.",
        }),
    type: z.enum(Object.values(CHANNEL_TYPE) as ChannelType[]),
});
export type UpsertChannelSchema = z.infer<typeof upsertChannelSchema>;