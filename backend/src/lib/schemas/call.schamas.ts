// modules
import z from "zod";
// constants
import { CALL_TYPES } from "@/lib/constants/call.constants";

export const livekitTokenSchema = z.object({
    type: z.enum(CALL_TYPES),
    serverId: z.string().min(1),
    targetId: z.string().min(1),
}).strict();

export type LivekitTokenSchema = z.infer<typeof livekitTokenSchema>;