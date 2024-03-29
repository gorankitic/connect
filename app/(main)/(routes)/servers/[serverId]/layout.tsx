
// next
import { redirect } from "next/navigation";
// components
import ServerSidebar from "@/components/server/ServerSidebar";
// utils
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
// clerk auth
import { redirectToSignIn } from "@clerk/nextjs";

const ServerIdLayout = async ({ children, params }: { children: React.ReactNode, params: { serverId: string } }) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout;