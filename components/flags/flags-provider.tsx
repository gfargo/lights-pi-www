"use client";
import { createContext, useContext } from "react";
import type { ClientFlags } from "@/lib/flags/runtime";

const FlagsContext = createContext<ClientFlags | null>(null);

export function FlagsProvider({
  flags,
  children,
}: {
  flags: ClientFlags;
  children: React.ReactNode;
}) {
  return <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>;
}

export function useFlags(): ClientFlags {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error("useFlags must be used within <FlagsProvider />");
  return ctx;
}

export function useFlag<K extends keyof ClientFlags>(key: K): ClientFlags[K] {
  return useFlags()[key];
}