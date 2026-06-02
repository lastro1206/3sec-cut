"use client";

import { create } from "zustand";

export type ScriptMode = "promotion" | "review";

export type GeneratedScript = {
  hook: string;
  body: string;
  cameraGuide: string[];
};

type ScriptState = {
  mode: ScriptMode;
  menuName: string;
  drinkPairing: string;
  keywords: string[];
  generatedScript: GeneratedScript;
  setMode: (mode: ScriptMode) => void;
  setMenuName: (menuName: string) => void;
  setDrinkPairing: (drinkPairing: string) => void;
  toggleKeyword: (keyword: string) => void;
  setGeneratedScript: (generatedScript: GeneratedScript) => void;
  resetInput: () => void;
};

const defaultGeneratedScript: GeneratedScript = {
  hook: "이 조합, 3초 안에 저장하게 됩니다.",
  body:
    "뜨겁게 올라오는 메인 메뉴의 김을 먼저 보여주세요. 한입 크기로 들어 올린 뒤, 곁들이는 술잔을 화면 오른쪽에 자연스럽게 배치하면 페어링 포인트가 바로 전달됩니다. 마지막 컷은 메뉴 이름과 오늘의 조합을 짧게 남겨 재방문 욕구를 만듭니다.",
  cameraGuide: [
    "0~1초: 메뉴 표면의 윤기와 김을 클로즈업",
    "1~2초: 술잔을 부딪히는 짧은 ASMR 컷 삽입",
    "2~3초: 한입 장면과 메뉴명 자막으로 마무리",
  ],
};

const initialInput = {
  mode: "promotion" as const,
  menuName: "",
  drinkPairing: "소주",
  keywords: ["가성비"],
};

export const useScriptStore = create<ScriptState>((set) => ({
  ...initialInput,
  generatedScript: defaultGeneratedScript,
  setMode: (mode) => set({ mode }),
  setMenuName: (menuName) => set({ menuName }),
  setDrinkPairing: (drinkPairing) => set({ drinkPairing }),
  toggleKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords.filter((item) => item !== keyword)
        : [...state.keywords, keyword],
    })),
  setGeneratedScript: (generatedScript) => set({ generatedScript }),
  resetInput: () => set(initialInput),
}));
