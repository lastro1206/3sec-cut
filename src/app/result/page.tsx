"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateScript, type GeneratedScript } from "@/lib/scriptApi";
import { useScriptStore } from "@/store/useScriptStore";

export default function ResultPage() {
  const mode = useScriptStore((state) => state.mode);
  const menuName = useScriptStore((state) => state.menuName);
  const drink = useScriptStore((state) => state.drink);
  const keywords = useScriptStore((state) => state.keywords);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const scriptText = useMemo(() => {
    if (!generatedScript) {
      return "";
    }

    return [
      `시선 끌기 Hook\n${generatedScript.hook}`,
      `본문 대본\n${generatedScript.body}`,
      `연출 가이드\n${generatedScript.camera_guide.join("\n")}`,
    ].join("\n\n");
  }, [generatedScript]);

  const fetchGeneratedScript = useCallback(async () => {
    setIsLoading(true);
    setNotice("");

    try {
      const result = await generateScript({
        mode,
        menuName,
        drink,
        keywords,
      });

      setGeneratedScript(result);
    } catch {
      setNotice("대본 생성 중 문제가 발생했어요. 다시 시도해 주세요.");
      setGeneratedScript(null);
    } finally {
      setIsLoading(false);
    }
  }, [drink, keywords, menuName, mode]);

  useEffect(() => {
    let isActive = true;

    async function loadInitialScript() {
      try {
        const result = await generateScript({
          mode,
          menuName,
          drink,
          keywords,
        });

        if (isActive) {
          setGeneratedScript(result);
        }
      } catch {
        if (isActive) {
          setNotice("대본 생성 중 문제가 발생했어요. 다시 시도해 주세요.");
          setGeneratedScript(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialScript();

    return () => {
      isActive = false;
    };
  }, [drink, keywords, menuName, mode]);

  const handleCopy = async () => {
    if (!scriptText) {
      return;
    }

    await navigator.clipboard.writeText(scriptText);
    setNotice("대본을 클립보드에 복사했어요.");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setNotice("");

    try {
      // TODO: Supabase scripts 테이블 연동 시 이 지점에서 insert를 호출합니다.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNotice("보관함 저장 함수 뼈대를 실행했어요.");
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
          {mode === "owner" ? "사장님 모드" : "리뷰어 모드"}
        </p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#333D4B]">
          바로 촬영할 수 있는
          <br />
          숏폼 대본이에요
        </h1>
        <p className="mt-3 text-base font-semibold leading-7 text-[#4E5968]">
          {menuName || "메뉴"} · {drink ?? "술 없음"}
        </p>
        {keywords.length > 0 ? (
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
        ) : null}
      </section>

      {isLoading ? (
        <section className="mt-10">
          <div className="rounded-2xl bg-[#F2F4F6] p-6">
            <p className="text-lg font-extrabold text-[#333D4B]">
              사장님의 대본을 맛있게 굽고 있어요...
            </p>
            <p className="mt-2 text-sm font-medium text-[#8B95A1]">
              메뉴와 술 조합을 분석해 후킹 멘트를 준비 중입니다.
            </p>
          </div>
          <div className="mt-4 space-y-4">
            {[120, 180, 150].map((width) => (
              <div key={width} className="rounded-2xl bg-[#F2F4F6] p-6">
                <div className="h-4 w-24 rounded-full bg-white" />
                <div
                  className="mt-5 h-5 rounded-full bg-white"
                  style={{ width }}
                />
                <div className="mt-3 h-5 w-full rounded-full bg-white" />
              </div>
            ))}
          </div>
        </section>
      ) : generatedScript ? (
        <section className="mt-8 space-y-4">
          <article className="rounded-2xl bg-[#F2F4F6] p-6">
            <p className="text-sm font-bold text-[#3182F6]">
              시선 끌기 Hook
            </p>
            <h2 className="mt-3 text-[26px] font-extrabold leading-snug tracking-[-0.03em] text-[#333D4B]">
              {generatedScript.hook}
            </h2>
          </article>

          <article className="rounded-2xl bg-[#F2F4F6] p-6">
            <p className="text-sm font-bold text-[#8B95A1]">본문 대본</p>
            <p className="mt-3 whitespace-pre-line text-[17px] font-semibold leading-relaxed text-[#4E5968]">
              {generatedScript.body}
            </p>
          </article>

          <article className="rounded-2xl bg-[#F2F4F6] p-6">
            <p className="text-sm font-bold text-[#8B95A1]">연출 가이드</p>
            <ul className="mt-4 space-y-3">
              {generatedScript.camera_guide.map((guide) => (
                <li
                  key={guide}
                  className="flex gap-3 text-sm font-semibold leading-6 text-[#4E5968]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#3182F6]">
                    ✓
                  </span>
                  <span>{guide}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      ) : (
        <section className="mt-10 rounded-2xl bg-[#F2F4F6] p-6 text-center">
          <p className="text-lg font-extrabold text-[#333D4B]">
            대본을 불러오지 못했어요
          </p>
          <button
            type="button"
            onClick={() => void fetchGeneratedScript()}
            className="mt-5 h-12 rounded-2xl bg-[#3182F6] px-5 text-sm font-extrabold text-white"
          >
            다시 시도하기
          </button>
        </section>
      )}

      {notice ? (
        <div className="fixed inset-x-0 bottom-40 z-10 mx-auto w-full max-w-[480px] px-5">
          <p className="rounded-2xl bg-[#333D4B] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_12px_24px_rgba(51,61,75,0.18)]">
            {notice}
          </p>
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] bg-white/95 px-5 pb-5 pt-3 backdrop-blur">
        <button
          type="button"
          onClick={handleCopy}
          disabled={isLoading || !generatedScript}
          className="h-[60px] w-full rounded-[22px] bg-[#3182F6] text-base font-extrabold text-white shadow-[0_12px_24px_rgba(49,130,246,0.22)] transition active:scale-[0.99] disabled:bg-[#F2F4F6] disabled:text-[#8B95A1] disabled:shadow-none"
        >
          대본 복사하기
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => void fetchGeneratedScript()}
            disabled={isLoading}
            className="h-14 rounded-[20px] bg-[#F2F4F6] text-sm font-extrabold text-[#333D4B] disabled:text-[#8B95A1]"
          >
            다시 생성하기
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading || isSaving || !generatedScript}
            className="h-14 rounded-[20px] bg-[#F2F4F6] text-sm font-extrabold text-[#333D4B] disabled:text-[#8B95A1]"
          >
            {isSaving ? "저장 중" : "보관함에 저장"}
          </button>
        </div>
      </div>
    </main>
  );
}
