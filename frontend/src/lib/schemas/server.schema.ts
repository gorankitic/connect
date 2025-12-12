// modules
import { z } from "zod";

export const createServerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    avatarUuid: z.uuid("Server avatar is required"),
}).strict();
export type CreateServerSchema = z.infer<typeof createServerSchema>;