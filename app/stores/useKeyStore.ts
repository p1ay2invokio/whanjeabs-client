import { create } from "zustand";

type keyStoreType = {
    api_key: string,
    setApi_key: (key: string) => void
}

export const useKeyStore = create<keyStoreType>((set) => ({
    api_key: '',
    setApi_key: (key: string) => set(() => ({ api_key: key })),
}));
