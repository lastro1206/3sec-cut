import axios from "axios";
import type { ScriptMode } from "@/store/useScriptStore";

export interface GeneratedScript {
  hook: string;
  body: string;
  cameraGuide: string[];
}

export type GenerateScriptPayload = {
  mode: ScriptMode | null;
  menuName: string;
  drink: string | null;
  keywords: string[];
};

export type SaveScriptPayload = GenerateScriptPayload & {
  generatedScript: GeneratedScript;
};

const scriptClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function generateScript(
  payload: GenerateScriptPayload,
): Promise<GeneratedScript> {
  const { data } = await scriptClient.post<GeneratedScript>(
    "/api/scripts/generate",
    payload,
  );

  return data;
}

export async function saveScript(payload: SaveScriptPayload) {
  const { data } = await scriptClient.post("/api/scripts", payload);

  return data;
}
