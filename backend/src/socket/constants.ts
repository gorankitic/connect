// Channel constants
export const CHANNEL_ROOM_PREFIX = "channel";

export const CHANNEL_EVENTS = {
    MESSAGE_CREATE: "channel:message:create",
    MESSAGE_UPDATE: "channel:message:update",
    MESSAGE_DELETE: "channel:message:delete",
} as const;

// Conversation constants
export const CONVERSATION_ROOM_PREFIX = "conversation";

export const CONVERSATION_EVENTS = {
    MESSAGE_CREATE: "conversation:message:create",
    MESSAGE_UPDATE: "conversation:message:update",
    MESSAGE_DELETE: "conversation:message:delete",
} as const;

// Notification constants
export const NOTIFICATION_ROOM_PREFIX = "user";

export const NOTIFICATION_EVENTS = {
    NOTIFICATION_SET: "notification:set",
    NOTIFICATION_RESET: "notification:reset"
} as const;