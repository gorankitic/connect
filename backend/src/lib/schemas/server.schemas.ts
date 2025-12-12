// modules
import { z } from "zod";

export const createServerSchema = z.object({
    name: z.string().trim().max(50, "Name must be less than 50 characters"),
    avatarUuid: z.uuid()
}).strict();
export type CreateServerSchema = z.infer<typeof createServerSchema>;