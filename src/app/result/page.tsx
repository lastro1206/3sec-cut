"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { generateScript, saveScript } from "@/lib/scriptApi";
import { useScriptStore } from "@/store/useScriptStore";

export default function ResultPage() {
  const mode = useScriptStore((state) => state.mode);
  const menuName = useScriptStore((state) => state.menuName);
  const drinkPairing = useScriptStore((state) => state.drinkPairing);
  const keywords = useScriptStore((state) => state.keywords);
  const generatedScript = useScriptStore((state) => state.generatedScript);
  const setGeneratedScript = useScriptStore((state) => state.setGeneratedScript);
  const [notice, setNotice] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const scriptText = useMemo(
    () =>
      [
        `[Hook]\n${generatedScript.hook}`,
        `[본문]\n${generatedScript.body}`,
        `[촬영 및 ASMR 가이드]\n${generatedScript.cameraGuide.join("\n")}`,
      ].join("\n\n"),
    [generatedScript],
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptText);
    setNotice("대본을 클립보드에 복사했어요.");
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setNotice("");

    try {
      const nextScript = await generateScript({
        mode,
        menuName,
        drinkPairing,
        keywords,
      });
      setGeneratedScript(nextScript);
      setNotice("새 대본을 생성했어요.");
    } catch {
      setNotice("API 연결 전이라 재생성 요청 뼈대만 실행됐어요.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setNotice("");

    try {
      await saveScript({
        mode,
        menuName,
        drinkPairing,
        keywords,
        generatedScript,
      });
      setNotice("보관함에 저장했어요.");
    } catch {
      setNotice("API 연결 전이라 저장 요청 뼈대만 실행됐어요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-5 pb-44 pt-5">
      <header className="flex items-center justify-between">
        <Link
          href="/create"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F4F6] text-xl font-bold text-[#4E5968]"
          aria-label="입력 화면으로 이동"
        >
          ‹
        </Link>
        <Link
          href="/library"
          className="rounded-full bg-[#F2F4F6] px-4 py-3 text-sm font-bold text-[#4E5968]"
        >
          보관함
        </Link>
      </header>

      <section className="pt-8">
        <p className="text-sm font-bold text-[#3182F6]">
          {menuName || "메뉴"} · {drinkPairing}
        </p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#333D4B]">
          바로 촬영할 수 있는
          <br />
          숏폼 대본이에요
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-[#F2F4F6] px-3 py-2 text-xs font-bold text-[#4E5968]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <article className="rounded-[28px] bg-[#F2F4F6] p-6">
          <p className="text-sm font-bold text-[#3182F6]">시선 끌기 Hook</p>
          <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#333D4B]">
            {generatedScript.hook}
          </h2>
        </article>

        <article className="rounded-[28px] bg-[#F2F4F6] p-6">
          <p className="text-sm font-bold text-[#8B95A1]">본문 대본</p>
          <p className="mt-3 whitespace-pre-line text-[17px] font-medium leading-8 text-[#4E5968]">
            {generatedScript.body}
          </p>
        </article>

        <article className="rounded-[28px] bg-[#F2F4F6] p-6">
          <p className="text-sm font-bold text-[#8B95A1]">
            촬영 및 소리(ASMR) 가이드
          </p>
          <ul className="mt-4 space-y-3">
            {generatedScript.cameraGuide.map((guide) => (
              <li key={guide} className="flex gap-3 text-sm leading-6 text-[#4E5968]">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-white text-center text-xs font-extrabold text-[#3182F6]">
                  ✓
                </span>
                <span>{guide}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {notice ? (
        <p className="mt-5 rounded-2xl bg-[#F2F4F6] px-4 py-3 text-center text-sm font-bold text-[#4E5968]">
          {notice}
        </p>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] bg-white/95 px-5 pb-5 pt-3 backdrop-blur">
        <button
          type="button"
          onClick={handleCopy}
          className="h-[60px] w-full rounded-[22px] bg-[#3182F6] text-base font-extrabold text-white shadow-[0_12px_24px_rgba(49,130,246,0.22)] transition active:scale-[0.99]"
        >
          대본 복사하기
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="h-14 rounded-[20px] bg-[#F2F4F6] text-sm font-extrabold text-[#333D4B] disabled:text-[#8B95A1]"
          >
            {isRegenerating ? "생성 중" : "다시 생성하기"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="h-14 rounded-[20px] bg-[#F2F4F6] text-sm font-extrabold text-[#333D4B] disabled:text-[#8B95A1]"
          >
            {isSaving ? "저장 중" : "보관함에 저장"}
          </button>
        </div>
      </div>
    </main>
  );
}
