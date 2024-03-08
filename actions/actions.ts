"use server";

// prisma
import { MemberRole } from "@prisma/client";
// utils
import { currentProfile } from "@/lib/currentProfile";
import { getErrorMessage } from "@/lib/utils";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
// types
import { ServerFormSchema, serverFormSchema } from "@/types";

export const createServer = async ({ name, imageUrl }: ServerFormSchema) => {
    const profile = await currentProfile();

    if (!profile) {
        throw new Error("❌Server error: There is no current profile.");
    }

    // zod server-side validation
    const validatedFields = serverFormSchema.safeParse({ name, imageUrl });

    if (!validatedFields.success) {
        return { message: "Invalid server data." }
    }

    const { data } = validatedFields;

    try {
        await db.server.create({
            data: {
                profileId: profile.id,
                name: data.name,
                imageUrl: data.imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        { name: "general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        });
    } catch (error: unknown) {
        console.log(error);
        return { message: getErrorMessage(error) }
    }
}