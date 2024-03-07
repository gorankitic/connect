// next
import { redirect } from "next/navigation";
// components
import ServerHeader from "./ServerHeader";
// utils
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { channel } from "diagnostics_channel";
// prisma
import { ChannelType } from "@prisma/client";


const ServerSidebar = async ({ serverId }: { serverId: string }) => {

    const profile = await currentProfile();
    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    if(!server) {
        return redirect("/");
    }

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const member = server?.members.filter((member) => member.profileId !== profile.id);
    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}

export default ServerSidebar;