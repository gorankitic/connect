
// next
import { NextApiRequest } from "next";
// clerk
import { getAuth } from "@clerk/nextjs/server";
// utils
import { db } from "@/lib/db";

export const currentProfileForPages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({ where: { userId } });

    return profile;
}