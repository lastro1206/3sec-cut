import { NextResponse } from "next/server";
import type { ScriptMode } from "@/store/useScriptStore";

type GenerateRequestBody = {
  mode: ScriptMode | null;
  menuName: string;
  drink: string | null;
  keywords: string[];
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequestBody;
  const menuName = body.menuName.trim() || "갈비찜";
  const drink = body.drink ?? "소주";
  const keywordText =
    body.keywords.length > 0 ? body.keywords.join(", ") : "밥도둑";

  await delay(2000);

  return NextResponse.json({
    hook: `오늘 퇴근하고 ${keywordText} 겸 ${drink} 도둑 찾으시나요?`,
    body: `매콤한 ${menuName} 한 입에 스트레스가 확 풀리는데, 여기에 차가운 ${drink} 한 잔 털어 넣으면 그야말로 극락입니다. 첫 컷은 음식이 끓는 장면으로 시선을 잡고, 두 번째 컷에서 한입 크게 들어 올려 식감을 보여주세요. 마지막에는 "${menuName}에는 ${drink}"라는 짧은 자막으로 저장 욕구를 만들어 주세요.`,
    camera_guide: [
      `${menuName}이 보글보글 끓는 장면 클로즈업`,
      `${drink}잔 부딪히는 쨍한 소리 3초 강조`,
      "고기 결대로 찢어지는 모습 줌인",
    ],
  });
}
