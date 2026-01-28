// modules
import { Server, Socket } from "socket.io";
import chalk from "chalk";
// services
import { assertConversationAccess } from "@/services/conversation.services";
import { assertServerMember } from "@/services/member.services";
// constants
import { CONVERSATION_ROOM_PREFIX } from "@/socket/constants";
// types
import { ConversationJoinPayload } from "@/socket/types/types";

export const registerConversationHandlers = (io: Server, socket: Socket) => {
    socket.on("conversation:join", async (payload: ConversationJoinPayload, ack?: (res: any) => void) => {
        try {
            const { serverId, conversationId } = payload;
            const userId = String(socket.data.user._id);

            // Check is user a member of this server
            const member = await assertServerMember({ serverId, userId });
            // Check does conversation exist in this server 
            await assertConversationAccess({ serverId, conversationId, currentMemberId: String(member._id) });

            // Leave any previously joined conversation rooms (prevents duplicate deliveries)
            for (const room of socket.rooms) {
                if (room.startsWith(CONVERSATION_ROOM_PREFIX)) socket.leave(room);
            }

            socket.join(`${CONVERSATION_ROOM_PREFIX}:${conversationId}`);

            console.log(chalk.bgBlue.bold(`[conversation:join] user=${socket.data.user._id} socket=${socket.id} conversation=${conversationId}`));

            ack?.({ ok: true, conversationId });
        } catch (err: any) {
            ack?.({ ok: false, message: err?.message ?? "Unable to join conversation" });
        }
    });

    socket.on("conversation:leave", ({ conversationId }: { conversationId: string }, ack?: (res: any) => void) => {
        socket.leave(`${CONVERSATION_ROOM_PREFIX}:${conversationId}`);

        console.log(chalk.bgBlue.bold(`[conversation:leave] user=${socket.data.user._id} socket=${socket.id} conversation=${conversationId}`));

        ack?.({ ok: true });
    });
}