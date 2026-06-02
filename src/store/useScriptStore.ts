"use client";

import { create } from "zustand";

export type ScriptMode = "owner" | "reviewer";

export interface ScriptState {
  mode: ScriptMode | null;
  menuName: string;
  drink: string | null;
  keywords: string[];
}

export interface ScriptActions {
  setMode: (mode: ScriptMode | null) => void;
  setMenuName: (menuName: string) => void;
  setDrink: (drink: string | null) => void;
  toggleKeyword: (keyword: string) => void;
  resetState: () => void;
}

export type ScriptStore = ScriptState & ScriptActions;

const initialState: ScriptState = {
  mode: null,
  menuName: "",
  drink: null,
  keywords: [],
};

export const useScriptStore = create<ScriptStore>((set) => ({
  ...initialState,
  setMode: (mode) => set({ mode }),
  setMenuName: (menuName) => set({ menuName }),
  setDrink: (drink) => set({ drink }),
  toggleKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords.filter((item) => item !== keyword)
        : [...state.keywords, keyword],
    })),
  resetState: () => set(initialState),
}));
