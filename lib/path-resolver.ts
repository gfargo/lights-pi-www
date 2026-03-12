import fs from "node:fs";
import path from "node:path";

interface ProjectConfig {
  aliases: Record<string, string>;
  baseDir: string;
  hasSrcDir: boolean;
}

interface PathResolver {
  resolveProjectConfig(): ProjectConfig;
  resolveFlagDefsPath(): string;
  resolveRegistryConfigPath(): string;
  resolveAbsolutePath(aliasPath: string): string;
}

export function createPathResolver(rootDir: string = process.cwd()): PathResolver {
  function resolveProjectConfig(): ProjectConfig {
    const componentsJsonPath = path.join(rootDir, "components.json");
    const tsconfigPath = path.join(rootDir, "tsconfig.json");
    
    let aliases: Record<string, string> = {};
    let baseDir = rootDir;
    let hasSrcDir = false;

    // Try to read components.json first
    if (fs.existsSync(componentsJsonPath)) {
      try {
        const componentsConfig = JSON.parse(fs.readFileSync(componentsJsonPath, "utf8"));
        if (componentsConfig.aliases) {
          aliases = componentsConfig.aliases;
        }
      } catch (error) {
        console.warn("Warning: Could not parse components.json, falling back to defaults");
      }
    }

    // If no aliases found, try tsconfig.json
    if (Object.keys(aliases).length === 0 && fs.existsSync(tsconfigPath)) {
      try {
        const tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
        // Remove comments and parse JSON
        const cleanContent = tsconfigContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
        const tsconfig = JSON.parse(cleanContent);
        
        if (tsconfig.compilerOptions?.paths) {
          const paths = tsconfig.compilerOptions.paths;
          for (const [alias, targets] of Object.entries(paths)) {
            if (Array.isArray(targets) && targets.length > 0) {
              // Convert TypeScript path mapping to simple alias
              const cleanAlias = alias.replace('/*', '');
              const cleanTarget = (targets[0] as string).replace('/*', '');
              aliases[cleanAlias] = cleanTarget;
            }
          }
        }
      } catch (error) {
        console.warn("Warning: Could not parse tsconfig.json, falling back to defaults");
      }
    }

    // Default fallback aliases if none found
    if (Object.keys(aliases).length === 0) {
      aliases = {
        "@": "./src",
        "@/lib": "./src/lib",
        "@/components": "./src/components"
      };
    }

    // Check if src directory exists
    hasSrcDir = fs.existsSync(path.join(rootDir, "src"));

    return { aliases, baseDir, hasSrcDir };
  }

  function resolveAbsolutePath(aliasPath: string): string {
    const config = resolveProjectConfig();
    
    // Find matching alias
    for (const [alias, target] of Object.entries(config.aliases)) {
      if (aliasPath.startsWith(alias)) {
        const relativePath = aliasPath.replace(alias, target);
        return path.resolve(config.baseDir, relativePath);
      }
    }

    // If no alias matches, try common patterns
    if (aliasPath.startsWith("@/")) {
      const fallbackPath = aliasPath.replace("@/", config.hasSrcDir ? "src/" : "");
      return path.resolve(config.baseDir, fallbackPath);
    }

    // Return as-is if no alias resolution possible
    return path.resolve(config.baseDir, aliasPath);
  }

  function resolveFlagDefsPath(): string {
    return resolveAbsolutePath("@/lib/flags/defs");
  }

  function resolveRegistryConfigPath(): string {
    return resolveAbsolutePath("@/lib/flags/registry.config.ts");
  }

  return {
    resolveProjectConfig,
    resolveFlagDefsPath,
    resolveRegistryConfigPath,
    resolveAbsolutePath
  };
}