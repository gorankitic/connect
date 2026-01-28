// lib
import { create } from "zustand";
// types
import type { ChatStoreData, ChatType } from "@/lib/types/chat.types";

type ChatStore = {
    type: ChatType | undefined;
    serverId: string | undefined;
    targetId: string | undefined;
    enterChat: (data: ChatStoreData) => void;
    leaveChat: () => void;
}

export const useChat = create<ChatStore>((set) => ({
    type: undefined,
    serverId: undefined,
    targetId: undefined,
    enterChat: ({ type, serverId, targetId }) => set({ type, serverId, targetId }),
    leaveChat: () => set({ type: undefined, serverId: undefined, targetId: undefined })
}));