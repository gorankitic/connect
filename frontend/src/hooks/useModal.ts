// lib
import { create } from "zustand";
// types
import type { ChannelType } from "@/lib/types/channel.types";

export type ModalType = "createServer" | "updateServer" | "invite" | "manageMembers" | "leaveServer" | "deleteServer" | "createChannel" | "updateChannel" | "deleteChannel";

export type ModalData = {
    serverId?: string,
    channelId?: string,
    channelType?: ChannelType,
}

type ModalStore = {
    type: ModalType | null,
    isOpen: boolean,
    data: ModalData,
    onOpen: (type: ModalType, data?: ModalData) => void,
    onClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false })
}));