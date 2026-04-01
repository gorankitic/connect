// modules
import { Types } from "mongoose";

export type NotificationDTO = {
    currentMemberId: Types.ObjectId;
    conversationId: string;
    serverId: string;
}

export type GetAllNotificationsDTO = {
    currentMemberId: Types.ObjectId;
    serverId: string;
}