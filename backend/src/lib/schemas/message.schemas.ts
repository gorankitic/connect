// modules
import { z } from "zod";

export const upsertMessageSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(2000, "Message is too long")
});
export type UpsertMessageSchema = z.infer<typeof upsertMessageSchema>;