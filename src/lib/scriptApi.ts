import axios from "axios";
import type { GeneratedScript, ScriptMode } from "@/store/useScriptStore";

export type GenerateScriptPayload = {
  mode: ScriptMode;
  menuName: string;
  drinkPairing: string;
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
