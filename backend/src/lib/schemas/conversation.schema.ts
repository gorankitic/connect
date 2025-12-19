// modules
import { z } from "zod";

export const getOrCreateConversationSchema = z.object({
    memberId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid memberId")
});
export type GetOrCreateConversationSchema = z.infer<typeof getOrCreateConversationSchema>;