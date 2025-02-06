import { create } from "zustand";

interface UNIVERSALSTORE {
  headerName: string;
  fetchUniverseStore: () => void;
  setHeaderName: (title: string) => void;
}

export const universalStore = create<UNIVERSALSTORE>((set) => ({
  headerName: "",
  fetchUniverseStore: () => {
    set({ headerName: "All Reports" });
  },
  setHeaderName: (title: string) => {
    set({ headerName: title });
  },
}));
