import { z } from "zod";
import { defineFlag } from "../kit";

export const key = "enable-demo" as const;
export const schema = z.boolean();

export default defineFlag({
  key,
  schema,
  description: "Enable demo page in navigation and sitemap",
  defaultValue: false,
  client: { public: true },
  async decide() {
    // Enable when demo is ready for public access
    return process.env.ENABLE_DEMO === "true";
  },
});
