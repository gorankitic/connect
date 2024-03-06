// zod
import * as z from "zod";

// zod validation schema
export const serverFormSchema = z.object({
    name: z.string().min(1, { message: "Server name is required." }),
    imageUrl: z.string().min(1, { message: "Image is required." })
});

export type ServerFormSchema = z.infer<typeof serverFormSchema>;