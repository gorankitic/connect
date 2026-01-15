export const CHANNEL_TYPES = ["TEXT", "AUDIO", "VIDEO"] as const;

export const CHANNEL_EVENTS = {
    MESSAGE_NEW: "channel:message:new",
    MESSAGE_UPDATE: "channel:message:update",
    MESSAGE_DELETE: "channel:message:delete",
} as const;