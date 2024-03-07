// next
import { NextResponse } from "next/server";
// utils
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function PATCH(req: Request, { params }: { params: { serverId: string }}) {

    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!params.serverId) {
            return new NextResponse("Server Id missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
            },
            data: {
                name,
                imageUrl
            }
        });
        return NextResponse.json(server);

    } catch(error) {
        console.log("❌Server error: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}