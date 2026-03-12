import { z } from "zod";
import type { FlagDefinition } from "./kit";

/**
 * Managed regions — the wizard inserts new imports and entries
 * between these tags. Manual edits are fine too.
 */

// @fargo-flags:imports
import * as f_enable_showcase from "./defs/enable-showcase.flag";
// @fargo-flags:imports:end

export const flagSchemas = {
  // @fargo-flags:schemas
  "enable-showcase": f_enable_showcase.schema,
  // @fargo-flags:schemas:end
} as const;

export const registry = {
  // @fargo-flags:registry
  "enable-showcase": f_enable_showcase.default,
  // @fargo-flags:registry:end
} as const satisfies Record<
  keyof typeof flagSchemas,
  FlagDefinition<z.ZodTypeAny>
>;

/** Keys safe to send to the client (NEXT_PUBLIC-style). */
export const clientFlagKeys = [
  // @fargo-flags:public
  "enable-showcase",
  // @fargo-flags:public:end
] as const;

export type SchemaMap = typeof flagSchemas;
export type FlagKey = keyof SchemaMap;