"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const savedScripts = [
  {
    id: "script-1",
    menuName: "숯불 닭갈비",
    drinkPairing: "소주",
    createdAt: "2026.06.02",
    mode: "홍보 릴스",
  },
  {
    id: "script-2",
    menuName: "트러플 감자전",
    drinkPairing: "막걸리",
    createdAt: "2026.05.29",
    mode: "내돈내산 리뷰",
  },
  {
    id: "script-3",
    menuName: "우삼겹 전골",
    drinkPairing: "하이볼",
    createdAt: "2026.05.24",
    mode: "홍보 릴스",
  },
  {
    id: "script-4",
    menuName: "바삭 치킨",
    drinkPairing: "맥주",
    createdAt: "2026.05.18",
    mode: "내돈내산 리뷰",
  },
];

export default function LibraryPage() {
  const [query, setQuery] = useState("");

  const filteredScripts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return savedScripts;
    }

    return savedScripts.filter((script) =>
      script.menuName.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-white px-5 pb-10 pt-5">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F4F6] text-xl font-bold text-[#4E5968]"
          aria-label="홈으로 이동"
        >
          ‹
        </Link>
        <Link
          href="/create"
          className="rounded-full bg-[#3182F6] px-4 py-3 text-sm font-bold text-white"
        >
          새 대본
        </Link>
      </header>

      <section className="pt-8">
        <h1 className="text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#333D4B]">
          내 보관함
        </h1>
        <p className="mt-3 text-base leading-7 text-[#4E5968]">
          저장한 메뉴별 대본을 빠르게 찾아 다시 활용하세요.
        </p>
      </section>

      <label className="mt-8 flex h-[60px] items-center gap-3 rounded-[22px] bg-[#F2F4F6] px-5 focus-within:ring-2 focus-within:ring-[#3182F6]">
        <span className="text-lg font-black text-[#8B95A1]">검색</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="메뉴 이름으로 검색"
          className="min-w-0 flex-1 bg-transparent text-base font-bold text-[#333D4B] outline-none placeholder:text-[#8B95A1]"
        />
      </label>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#333D4B]">저장 내역</h2>
          <p className="text-sm font-bold text-[#8B95A1]">
            {filteredScripts.length}개
          </p>
        </div>

        {filteredScripts.length > 0 ? (
          <div className="space-y-3">
            {filteredScripts.map((script) => (
              <article
                key={script.id}
                className="rounded-[26px] bg-[#F2F4F6] p-5 transition active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#3182F6]">
                      {script.mode}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[#333D4B]">
                      {script.menuName}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-2 text-xs font-extrabold text-[#4E5968]">
                    {script.drinkPairing}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm font-semibold text-[#8B95A1]">
                  <span>생성 날짜</span>
                  <span>{script.createdAt}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[26px] bg-[#F2F4F6] px-5 py-12 text-center">
            <p className="text-base font-extrabold text-[#333D4B]">
              검색 결과가 없어요
            </p>
            <p className="mt-2 text-sm font-medium text-[#8B95A1]">
              다른 메뉴 이름으로 다시 검색해 보세요.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
