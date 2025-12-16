// lib
import { create } from "zustand";
// types
import type { ServerWithChannels } from "@/lib/api/apiTypes";

export type ModalType = "createServer" | "updateServer" | "invite" | "manageMembers" | "leaveServer";

export type ModalData = {
    server?: ServerWithChannels,
    memberId?: string,
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