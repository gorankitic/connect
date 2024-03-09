import { currentProfileForPages } from "@/lib/currentProfileForPages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed!" });
    }
    try {
        const profile = await currentProfileForPages(req);
        const { content, fileUrl } = req.body;
        const { serverId, channelId } = req.query;

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!serverId) {
            return res.status(400).json({ error: "ServerId missing" });
        }
        if (!channelId) {
            return res.status(400).json({ error: "ChannelId missing" });
        }
        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        });
        if (!server) {
            return res.status(404).json({ message: "Server not found" });
        }

        const member = server.members.find(member => member.profileId === profile.id);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channelId as string,
                memberId: member.id
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        });

        const channelKey = `chat:${channelId}:messages`;
        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);

    } catch (error) {
        console.log("❌Message POST method error: ", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}