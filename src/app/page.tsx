import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-5 pb-8 pt-5">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-[#333D4B]">
          3초컷
        </Link>
        <Link
          href="/library"
          aria-label="내 보관함으로 이동"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F4F6] text-lg font-bold text-[#4E5968]"
        >
          마
        </Link>
      </header>

      <section className="pt-14">
        <p className="mb-3 text-sm font-semibold text-[#3182F6]">
          요식업 숏폼 대본 자동 생성
        </p>
        <h1 className="text-[32px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#333D4B]">
          메뉴와 술 조합만으로
          <br />
          3초 후킹 대본 완성
        </h1>
        <p className="mt-4 text-base leading-7 text-[#4E5968]">
          입력은 줄이고 선택은 빠르게. 홍보 릴스와 내돈내산 리뷰에 필요한
          대본과 촬영 가이드를 한 번에 준비하세요.
        </p>
      </section>

      <section className="mt-10 flex flex-1 flex-col gap-4">
        <Link
          href="/create?mode=promotion"
          className="group flex min-h-[210px] flex-col justify-between rounded-[28px] bg-[#3182F6] p-6 text-white shadow-[0_16px_30px_rgba(49,130,246,0.24)] transition-transform active:scale-[0.99]"
        >
          <div>
            <p className="text-sm font-semibold text-white/75">사장님 모드</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.02em]">
              홍보 릴스 만들기
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              메뉴 장점, 페어링, 매장 홍보 포인트를 짧고 선명한 영상 대본으로
              정리합니다.
            </p>
          </div>
          <span className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-5 text-base font-bold text-[#3182F6]">
            대본 만들기
          </span>
        </Link>

        <Link
          href="/create?mode=review"
          className="flex min-h-[180px] flex-col justify-between rounded-[28px] bg-[#F2F4F6] p-6 text-[#333D4B] transition-transform active:scale-[0.99]"
        >
          <div>
            <p className="text-sm font-semibold text-[#8B95A1]">리뷰어 모드</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.02em]">
              내돈내산 숏폼 후기 쓰기
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4E5968]">
              과장 없이 맛, 분위기, 소리 중심으로 리뷰 흐름을 구성합니다.
            </p>
          </div>
          <span className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-5 text-base font-bold text-[#333D4B]">
            리뷰 대본 시작
          </span>
        </Link>
      </section>

      <section className="mt-8 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-[#F9FAFB] px-3 py-4">
          <p className="text-lg font-extrabold text-[#333D4B]">3단계</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">선택 입력</p>
        </div>
        <div className="rounded-2xl bg-[#F9FAFB] px-3 py-4">
          <p className="text-lg font-extrabold text-[#333D4B]">ASMR</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">소리 가이드</p>
        </div>
        <div className="rounded-2xl bg-[#F9FAFB] px-3 py-4">
          <p className="text-lg font-extrabold text-[#333D4B]">저장</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">보관함</p>
        </div>
      </section>
    </main>
  );
}
