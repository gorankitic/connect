// next
import { redirect } from "next/navigation";
// utils
import { currentProfile } from "@/lib/currentProfile";
// clerk auth
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

type InviteCodeProps = {
    params: {
        inviteCode: string;
    }
}


const InviteCode = async ({ params }: InviteCodeProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }
    if(!params.inviteCode) {
        return redirect
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [{ profileId: profile.id }]
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`);
    }

    return null;
}

export default InviteCode;