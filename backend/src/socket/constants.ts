export const CHANNEL_ROOM_PREFIX = "channel:";

export const CHANNEL_EVENTS = {
    MESSAGE_NEW: "channel:message:new",
    MESSAGE_UPDATE: "channel:message:update",
    MESSAGE_DELETE: "channel:message:delete",
} as const;

export const CONVERSATION_ROOM_PREFIX = "conversation:";

export const CONVERSATION_EVENTS = {
    MESSAGE_NEW: "conversation:message:new",
    MESSAGE_UPDATE: "conversation:message:update",
    MESSAGE_DELETE: "conversation:message:delete",
} as const;