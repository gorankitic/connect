// modules
import { z } from "zod";

export const upsertServerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    avatarUuid: z.uuid()
}).strict();
export type UpsertServerSchema = z.infer<typeof upsertServerSchema>;