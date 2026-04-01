// types
import { GetAllNotificationsDTO, NotificationDTO } from "@/lib/types/notification.types";
// models
import { Notification } from "@/models/notification.model";
// services
import { getOtherMemberFromConversation } from "@/services/conversation.services";

export const upsertNotification = async ({ currentMemberId, conversationId, serverId }: NotificationDTO) => {
    // Find notification recipient
    const { otherMemberId, otherUserId } = await getOtherMemberFromConversation({ conversationId, currentMemberId, serverId });

    // Increment unreadCount
    const notification = await Notification.findOneAndUpdate(
        { sender: currentMemberId, recipient: otherMemberId, conversation: conversationId, server: serverId },
        { $inc: { unreadCount: 1 } },
        // upsert: if document is not found, create one
        // new: return the updated document (not the old one)
        { upsert: true, new: true }
    );

    return { notification, otherUserId };
}

export const resetUnreadCount = async ({ currentMemberId, conversationId, serverId }: NotificationDTO) => {
    // Find notification sender
    const { otherMemberId } = await getOtherMemberFromConversation({ conversationId, currentMemberId, serverId });

    // Reset unreadCount
    const notification = await Notification.findOneAndUpdate(
        { recipient: currentMemberId, sender: otherMemberId, conversation: conversationId, server: serverId },
        { $set: { unreadCount: 0 } },
        { new: true }
    );

    return { notification };
}

export const getAllNotifications = async ({ currentMemberId, serverId }: GetAllNotificationsDTO) => {

    const notifications = await Notification.find({ recipient: currentMemberId, server: serverId }).lean();

    return notifications;
}