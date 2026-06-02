"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useScriptStore, type ScriptMode } from "@/store/useScriptStore";

const drinkOptions = [
  { name: "소주", icon: "잔" },
  { name: "맥주", icon: "컵" },
  { name: "하이볼", icon: "볼" },
  { name: "막걸리", icon: "병" },
  { name: "와인", icon: "와" },
  { name: "무알콜", icon: "무" },
];

const keywordOptions = [
  "가성비",
  "육즙",
  "불맛",
  "바삭함",
  "데이트",
  "회식",
  "혼밥",
  "숨은맛집",
];

function CreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = useScriptStore((state) => state.mode);
  const menuName = useScriptStore((state) => state.menuName);
  const drinkPairing = useScriptStore((state) => state.drinkPairing);
  const keywords = useScriptStore((state) => state.keywords);
  const setMode = useScriptStore((state) => state.setMode);
  const setMenuName = useScriptStore((state) => state.setMenuName);
  const setDrinkPairing = useScriptStore((state) => state.setDrinkPairing);
  const toggleKeyword = useScriptStore((state) => state.toggleKeyword);

  useEffect(() => {
    const selectedMode = searchParams.get("mode");

    if (selectedMode === "promotion" || selectedMode === "review") {
      setMode(selectedMode as ScriptMode);
    }
  }, [searchParams, setMode]);

  const canSubmit = menuName.trim().length > 0 && drinkPairing.length > 0;

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
          {mode === "promotion" ? "사장님 모드" : "리뷰어 모드"}
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
              메인 메뉴
            </h2>
          </div>
          <p className="text-xs font-semibold text-[#8B95A1]">필수</p>
        </div>
        <label className="block rounded-[24px] bg-[#F2F4F6] p-5 transition focus-within:ring-2 focus-within:ring-[#3182F6]">
          <span className="text-sm font-semibold text-[#8B95A1]">
            어떤 메뉴를 찍을까요?
          </span>
          <input
            value={menuName}
            onChange={(event) => setMenuName(event.target.value)}
            placeholder="예: 숯불 닭갈비"
            className="mt-2 w-full bg-transparent text-xl font-extrabold text-[#333D4B] outline-none placeholder:text-[#8B95A1]"
          />
        </label>
      </section>

      <section className="mt-9">
        <p className="text-sm font-bold text-[#3182F6]">2단계</p>
        <h2 className="mt-1 text-xl font-extrabold text-[#333D4B]">
          곁들임 주류
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {drinkOptions.map((drink) => {
            const isSelected = drinkPairing === drink.name;

            return (
              <button
                key={drink.name}
                type="button"
                onClick={() => setDrinkPairing(drink.name)}
                className={`flex h-24 flex-col items-center justify-center rounded-[24px] text-sm font-bold transition active:scale-[0.98] ${
                  isSelected
                    ? "bg-[#3182F6] text-white shadow-[0_10px_22px_rgba(49,130,246,0.22)]"
                    : "bg-[#F2F4F6] text-[#4E5968]"
                }`}
              >
                <span
                  className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full text-xs ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white text-[#8B95A1]"
                  }`}
                >
                  {drink.icon}
                </span>
                {drink.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-9">
        <p className="text-sm font-bold text-[#3182F6]">3단계</p>
        <h2 className="mt-1 text-xl font-extrabold text-[#333D4B]">
          핵심 강조 포인트
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#8B95A1]">
          여러 개를 선택할 수 있어요.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywordOptions.map((keyword) => {
            const isSelected = keywords.includes(keyword);

            return (
              <button
                key={keyword}
                type="button"
                onClick={() => toggleKeyword(keyword)}
                className={`h-12 rounded-2xl px-5 text-sm font-bold transition active:scale-[0.98] ${
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
          className="h-16 w-full rounded-[22px] bg-[#3182F6] text-lg font-extrabold text-white shadow-[0_12px_24px_rgba(49,130,246,0.24)] transition active:scale-[0.99] disabled:bg-[#D1D6DB] disabled:shadow-none"
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
