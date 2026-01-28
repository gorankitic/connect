// modules
import { Server, Socket } from "socket.io";
import chalk from "chalk";
// services
import { assertChannelAccess } from "@/services/channel.services";
import { assertServerMember } from "@/services/member.services";
// constants
import { CHANNEL_ROOM_PREFIX } from "@/socket/constants";
// types
import { ChannelJoinPayload } from "@/socket/types/types";

export const registerChannelHandlers = (io: Server, socket: Socket) => {
    socket.on("channel:join", async (payload: ChannelJoinPayload, ack?: (res: any) => void) => {
        try {
            const { serverId, channelId } = payload;
            const userId = String(socket.data.user._id);

            // Check is user a member of this server
            await assertServerMember({ serverId, userId });
            // Check does channel exist in this server 
            await assertChannelAccess({ serverId, channelId });

            // Leave any previously joined channel rooms (prevents duplicate deliveries)
            for (const room of socket.rooms) {
                if (room.startsWith(CHANNEL_ROOM_PREFIX)) socket.leave(room);
            }

            socket.join(`${CHANNEL_ROOM_PREFIX}:${channelId}`);

            console.log(chalk.bgBlue.bold(`[channel:join] user=${socket.data.user._id} socket=${socket.id} channel=${channelId}`));

            ack?.({ ok: true, channelId });
        } catch (err: any) {
            ack?.({ ok: false, message: err?.message ?? "Unable to join channel" });
        }
    });

    socket.on("channel:leave", ({ channelId }: { channelId: string }, ack?: (res: any) => void) => {
        socket.leave(`${CHANNEL_ROOM_PREFIX}:${channelId}`);

        console.log(chalk.bgBlue.bold(`[channel:leave] user=${socket.data.user._id} socket=${socket.id} channel=${channelId}`));

        ack?.({ ok: true });
    });
}