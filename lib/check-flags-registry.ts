import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import fg from "fast-glob";
import { createPathResolver } from "./path-resolver";

const ROOT = process.cwd();
const pathResolver = createPathResolver(ROOT);

// Use alias-aware path resolution
const DEFS_DIR = pathResolver.resolveFlagDefsPath();
const REG_FILE = pathResolver.resolveRegistryConfigPath();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function importTs(p: string): Promise<any> {
  const url = pathToFileURL(p).href;
  return await import(url);
}

async function main() {
  // Convert absolute path to relative glob pattern for fast-glob
  const relativeDefsDir = path.relative(ROOT, DEFS_DIR);
  const defGlobPattern = path.join(relativeDefsDir, "**/*.flag.ts").replace(/\\/g, "/");
  const defPaths = await fg(defGlobPattern, { cwd: ROOT });
  const defs = await Promise.all(
    defPaths.map(async (rel) => {
      const abs = path.join(ROOT, rel);
      const mod = await importTs(abs);
      const key = mod.key ?? mod.default?.key;
      if (!key) throw new Error(`Missing export 'key' in ${rel}`);
      const isPublic = !!(mod.default?.client?.public);
      return { rel, key: String(key), isPublic };
    })
  );

  if (!fs.existsSync(REG_FILE)) throw new Error("registry.config.ts not found");
  const agg = await importTs(REG_FILE);
  const regKeys: string[] = Object.keys(agg.registry ?? {});
  const schemaKeys: string[] = Object.keys(agg.flagSchemas ?? {});
  const publicKeys: string[] = Array.from(agg.clientFlagKeys ?? []);

  const defKeySet = new Set(defs.map((d) => d.key));
  const regKeySet = new Set(regKeys);
  const schemaKeySet = new Set(schemaKeys);
  const publicKeySet = new Set(publicKeys);

  const missingInRegistry = [...defKeySet].filter((k) => !regKeySet.has(k));
  const missingInDefs = [...regKeySet].filter((k) => !defKeySet.has(k));

  const schemaNotInRegistry = [...schemaKeySet].filter((k) => !regKeySet.has(k));
  const registryNotInSchemas = [...regKeySet].filter((k) => !schemaKeySet.has(k));

  const filePublicNotListed = defs.filter((d) => d.isPublic && !publicKeySet.has(d.key)).map((d) => d.key);
  const listedButNotPublic = publicKeys.filter((k) => {
    const d = defs.find((x) => x.key === k);
    return !d?.isPublic;
  });

  let ok = true;
  function issue(title: string, items: string[]) {
    if (!items.length) return;
    ok = false;
    console.error(`\n${title}:`);
    for (const i of items) console.error(`  - ${i}`);
  }

  issue("Defs present but missing in registry.config", missingInRegistry);
  issue("Registry keys missing corresponding defs", missingInDefs);
  issue("flagSchemas keys missing in registry", schemaNotInRegistry);
  issue("registry keys missing in flagSchemas", registryNotInSchemas);
  issue("Public flags in files but missing from clientFlagKeys", filePublicNotListed);
  issue("Keys in clientFlagKeys but flags not marked public in files", listedButNotPublic);

  if (ok) {
    console.log(`✔ flags:check OK — ${regKeys.length} registered, ${defs.length} files, ${publicKeys.length} client-exposed`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});