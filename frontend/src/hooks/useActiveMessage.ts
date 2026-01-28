import { create } from "zustand";

type ActiveMessage = {
    id: string;
}

type ActiveMessageState = {
    activeMessage: ActiveMessage | null;
    startUpdating: (id: string) => void;
    stopUpdating: () => void;
}

export const useActiveMessage = create<ActiveMessageState>((set) => ({
    activeMessage: null,
    startUpdating: (id) => set({ activeMessage: { id } }),
    stopUpdating: () => set({ activeMessage: null }),
}));