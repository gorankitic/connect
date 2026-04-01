// modules
import { AccessToken } from "livekit-server-sdk";
// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// constants
import { MESSAGE_TYPE } from "@/lib/constants/message.constants";
import { LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL } from "@/config/env";
// services
import { assertServerMember } from "@/services/member.services";
import { assertChannelAccess } from "@/services/channel.services";
import { assertConversationAccess } from "@/services/conversation.services";

export const generateLivekitToken = catchAsync(async (req, res) => {
    const userId = String(req.user._id);
    const { type, serverId, targetId } = req.body;

    let roomName;

    if (type === MESSAGE_TYPE.CHANNEL) {
        await assertServerMember({ serverId, userId });
        const channel = await assertChannelAccess({ serverId, channelId: targetId });
        roomName = `channel_${channel._id}`;
    }

    if (type === MESSAGE_TYPE.CONVERSATION) {
        const member = await assertServerMember({ serverId, userId });
        const conversation = await assertConversationAccess({ serverId, conversationId: targetId, currentMemberId: member._id });
        roomName = `dm_${conversation._id}`;
    }

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: userId, name: req.user.name });

    at.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
    });

    const token = await at.toJwt();

    res.status(200).json({
        token,
        url: LIVEKIT_URL
    });
});