import { z } from "zod";

export type FlagContext = {
  getUser?: () => Promise<{ id: string; plan?: string } | null>;
  getWorkspace?: () => Promise<{ id: string; plan?: string } | null>;
};

export type ClientExposure<T = unknown> =
  | { public: true; serialize?: (value: T) => unknown } // exposed to client
  | { public: false }; // server-only

export type FlagDefinition<S extends z.ZodTypeAny> = {
  key: string;
  schema: S;
  description?: string;
  defaultValue: z.infer<S>;
  options?: { value: z.infer<S>; label?: string }[];
  client?: ClientExposure<z.infer<S>>; // NEXT_PUBLIC-style control
  decide?: (ctx: FlagContext) => z.infer<S> | Promise<z.infer<S>>; // server-side only
};

export function defineFlag<S extends z.ZodTypeAny>(def: FlagDefinition<S>) {
  return def;
}