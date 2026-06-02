"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useScriptStore, type ScriptMode } from "@/store/useScriptStore";

const drinkOptions = [
  "소주",
  "맥주",
  "하이볼",
  "막걸리",
  "없음",
];

const keywordOptions = [
  "가성비",
  "미친양",
  "노포분위기",
  "퇴근길",
  "밥도둑",
];

function CreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = useScriptStore((state) => state.mode);
  const menuName = useScriptStore((state) => state.menuName);
  const drink = useScriptStore((state) => state.drink);
  const keywords = useScriptStore((state) => state.keywords);
  const setMode = useScriptStore((state) => state.setMode);
  const setMenuName = useScriptStore((state) => state.setMenuName);
  const setDrink = useScriptStore((state) => state.setDrink);
  const toggleKeyword = useScriptStore((state) => state.toggleKeyword);

  useEffect(() => {
    const selectedMode = searchParams.get("mode");

    if (selectedMode === "owner" || selectedMode === "reviewer") {
      setMode(selectedMode as ScriptMode);
    }
  }, [searchParams, setMode]);

  const canSubmit = menuName.trim().length > 0;

  return (
    <main className="min-h-screen bg-white px-5 pb-36 pt-5">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F4F6] text-xl font-bold text-[#4E5968]"
          aria-label="홈으로 이동"
        >
          ‹
        </Link>
        <p className="text-sm font-bold text-[#8B95A1]">
          {mode === "owner" ? "사장님 모드" : "리뷰어 모드"}
        </p>
      </header>

      <section className="pt-8">
        <h1 className="text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#333D4B]">
          버튼 몇 번으로
          <br />
          숏폼 대본을 준비해요
        </h1>
        <p className="mt-3 text-base leading-7 text-[#4E5968]">
          텍스트 입력은 메뉴명만. 나머지는 선택 버튼으로 빠르게 구성합니다.
        </p>
      </section>

      <section className="mt-9">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-[#3182F6]">1단계</p>
            <h2 className="mt-1 text-xl font-extrabold text-[#333D4B]">
              오늘 소개할 음식은 무엇인가요?
            </h2>
          </div>
          <p className="text-xs font-semibold text-[#8B95A1]">필수</p>
        </div>
        <label className="block rounded-2xl border-2 border-transparent bg-[#F2F4F6] p-5 transition-colors focus-within:border-[#3182F6]">
          <input
            value={menuName}
            onChange={(event) => setMenuName(event.target.value)}
            placeholder="예: 숯불 닭갈비, 김치찌개"
            className="w-full bg-transparent text-lg font-bold text-[#333D4B] outline-none placeholder:text-[#8B95A1]"
          />
        </label>
      </section>

      <section className="mt-9">
        <p className="text-sm font-bold text-[#3182F6]">2단계</p>
        <h2 className="mt-1 text-xl font-extrabold text-[#333D4B]">
          어떤 술과 함께하나요?
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {drinkOptions.map((drinkOption) => {
            const isSelected = drink === drinkOption;

            return (
              <button
                key={drinkOption}
                type="button"
                onClick={() => setDrink(drinkOption)}
                className={`h-14 rounded-2xl text-base font-bold transition-colors active:scale-[0.98] ${
                  isSelected
                    ? "bg-[#3182F6] text-white"
                    : "bg-[#F2F4F6] text-[#4E5968]"
                }`}
              >
                {drinkOption}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-9">
        <p className="text-sm font-bold text-[#3182F6]">3단계</p>
        <h2 className="mt-1 text-xl font-extrabold text-[#333D4B]">
          어떤 점을 강조할까요?
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywordOptions.map((keyword) => {
            const isSelected = keywords.includes(keyword);

            return (
              <button
                key={keyword}
                type="button"
                onClick={() => toggleKeyword(keyword)}
                className={`h-11 rounded-xl px-4 text-sm font-bold transition-colors active:scale-[0.98] ${
                  isSelected
                    ? "bg-[#3182F6] text-white"
                    : "bg-[#F2F4F6] text-[#4E5968]"
                }`}
              >
                {keyword}
              </button>
            );
          })}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] bg-white/95 px-5 pb-5 pt-3 backdrop-blur">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => router.push("/result")}
          className="h-16 w-full rounded-[22px] bg-[#3182F6] text-lg font-extrabold text-white shadow-[0_12px_24px_rgba(49,130,246,0.24)] transition active:scale-[0.99] disabled:bg-[#F2F4F6] disabled:text-[#8B95A1] disabled:shadow-none"
        >
          3초 만에 숏폼 대본 뽑기 🚀
        </button>
      </div>
    </main>
  );
}

export default function CreatePage() {
  return (
    <Suspense>
      <CreateContent />
    </Suspense>
  );
}
