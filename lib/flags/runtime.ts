import { z } from "zod";
import {
  flagSchemas,
  registry,
  clientFlagKeys,
  type SchemaMap,
} from "./registry.config";
import type { FlagContext } from "./kit";

export type Flags = { [K in keyof SchemaMap]: z.infer<SchemaMap[K]> };
export type FlagKey = keyof Flags;

export type ClientSchemaMap = Pick<SchemaMap, (typeof clientFlagKeys)[number]>;
export type ClientFlags = {
  [K in keyof ClientSchemaMap]: z.infer<ClientSchemaMap[K]>;
};

export const defaultFlags = Object.fromEntries(
  Object.entries(registry).map(([key, def]) => [key, def.defaultValue])
) as Flags;

/** Resolve all flags on the server, validate against schemas. */
export async function resolveAllFlags(ctx?: FlagContext): Promise<Flags> {
  const keys = Object.keys(registry) as (keyof SchemaMap)[];

  // Handle empty registry case
  if (keys.length === 0) {
    return {} as Flags;
  }

  const entries = await Promise.all(
    keys.map(async (key) => {
      const def = registry[key];
      const raw = await Promise.resolve(
        def.decide?.(ctx!) ?? def.defaultValue
      );
      const value = flagSchemas[key].parse(raw);
      return [key, value] as const;
    })
  );
  return Object.fromEntries(entries) as Flags;
}

/** Create the client-safe subset (applies optional per-flag 'serialize'). */
export function pickClientFlags(flags: Flags): ClientFlags {
  const out: Record<string, unknown> = {};
  for (const key of clientFlagKeys) {
    out[key as string] = flags[key];
  }
  return out as ClientFlags;
}
