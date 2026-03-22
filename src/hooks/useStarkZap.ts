"use client";

import { useStarkZapContext } from "@/providers/StarkZapProvider";

export function useStarkZap() {
  return useStarkZapContext();
}
