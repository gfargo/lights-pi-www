import fs from "node:fs";
import path from "node:path";
import prompts from "prompts";
import { createPathResolver } from "./path-resolver";

const ROOT = process.cwd();
const pathResolver = createPathResolver(ROOT);

// Use alias-aware path resolution
const DEFS_DIR = pathResolver.resolveFlagDefsPath();
const REG_FILE = pathResolver.resolveRegistryConfigPath();

function snake(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
function kebab(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

async function main() {
  const answers = await prompts([
    { type: "text", name: "key", message: "Flag key (kebab-case)", validate: v => /^[a-z0-9][a-z0-9-]*$/.test(v) ? true : "kebab-case only" },
    { type: "select", name: "kind", message: "Value type", choices: [
      { title: "boolean", value: "boolean" },
      { title: "string enum", value: "enum" }
    ]},
    { type: prev => prev === "enum" ? "list" : null, name: "options", message: "Enum options (comma-separated)", separator: "," },
    { type: "toggle", name: "isPublic", message: "Expose to client?", initial: true },
    { type: prev => prev ? "text" : null, name: "sanitizer", message: "Serializer (optional JS expr, e.g. v => !!v)" },
    { type: (prev, vals) => vals.kind === "boolean" ? "toggle" : "text", name: "defaultValue", message: "Default value", initial: true },
    { type: "text", name: "description", message: "Description (optional)" }
  ]);

  const key = kebab(answers.key);
  const base = snake(key);
  const fileName = `${base}.flag.ts`;
  const importId = `f_${base}`;
  const defPath = path.join(DEFS_DIR, fileName);
  fs.mkdirSync(DEFS_DIR, { recursive: true });

  let schema = "z.boolean()";
  let defVal = String(answers.defaultValue);
  let optionsBlock = "";
  if (answers.kind === "enum") {
    const opts = (answers.options as string[]).map((s) => s.trim()).filter(Boolean);
    schema = `z.enum([${opts.map((o) => `"${o}"`).join(", ")}])`;
    defVal = `"${opts[0]}"`;
    optionsBlock = `\n  options: [${opts.map((o) => `{ value: "${o}" }`).join(", ")}],`;
  }

  const clientBlock = answers.isPublic
    ? answers.sanitizer
      ? `\n  client: { public: true, serialize: ${answers.sanitizer} },`
      : `\n  client: { public: true },`
    : `\n  client: { public: false },`;

  const contents = `import { z } from "zod";
import { defineFlag } from "../kit";

export const key = "${key}" as const;
export const schema = ${schema};

export default defineFlag({
  key,
  schema,
  description: ${JSON.stringify(answers.description || "")},
  defaultValue: ${defVal},${optionsBlock}${clientBlock}
});
`;

  // Write flag file (skip if exists)
  if (!fs.existsSync(defPath)) {
    fs.writeFileSync(defPath, contents, "utf8");
    console.log("✔ created", path.relative(ROOT, defPath));
  } else {
    console.log("ℹ exists", path.relative(ROOT, defPath), "— not overwriting");
  }

  // Update registry.config.ts
  let cfg = fs.readFileSync(REG_FILE, "utf8");
  const importLine = `import * as ${importId} from "./defs/${base}.flag";`;
  if (!cfg.includes(importLine)) {
    cfg = inject(cfg, /\/\/ @fargo-flags:imports\n/, importLine + "\n");
  }

  const schemaEntry = `  "${key}": ${importId}.schema,`;
  if (!cfg.includes(schemaEntry)) {
    cfg = inject(cfg, /\/\/ @fargo-flags:schemas\n/, schemaEntry + "\n");
  }

  const regEntry = `  "${key}": ${importId}.default,`;
  if (!cfg.includes(regEntry)) {
    cfg = inject(cfg, /\/\/ @fargo-flags:registry\n/, regEntry + "\n");
  }

  if (answers.isPublic) {
    const pubEntry = `  "${key}",`;
    if (!cfg.includes(pubEntry)) {
      cfg = inject(cfg, /\/\/ @fargo-flags:public\n/, pubEntry + "\n");
    }
  }

  fs.writeFileSync(REG_FILE, cfg, "utf8");
  console.log("✔ updated", path.relative(ROOT, REG_FILE));

  // Auto-format with Prettier if available
  await formatFiles([defPath, REG_FILE]);
}

function inject(src: string, anchor: RegExp, text: string) {
  const m = src.match(anchor);
  if (!m) throw new Error("Anchor not found in registry.config.ts");
  const insertAt = (m.index ?? 0) + m[0].length;
  return src.slice(0, insertAt) + text + src.slice(insertAt);
}

async function formatFiles(files: string[]) {
  try {
    const prettier = await import("prettier");
    for (const file of files) {
      const src = fs.readFileSync(file, "utf8");
      const cfg = await prettier.resolveConfig(file).catch(() => null);
      const formatted = await prettier.format(src, { ...(cfg ?? {}), filepath: file });
      fs.writeFileSync(file, formatted, "utf8");
      console.log("✔ formatted", path.relative(ROOT, file));
    }
  } catch {
    console.warn("(prettier not installed — skipping format)");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });