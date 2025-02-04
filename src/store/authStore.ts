import { create } from "zustand";

interface AUTHSTORE {
  token: string;
}

export const authStore = create<AUTHSTORE>((set) => ({
  token: "I am Kaleeswaran",
}));
