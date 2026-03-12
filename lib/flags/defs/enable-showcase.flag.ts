import { z } from "zod";
import { defineFlag } from "../kit";

export const key = "enable-showcase" as const;
export const schema = z.boolean();

export default defineFlag({
  key,
  schema,
  description: "Enable showcase page in navigation and sitemap",
  defaultValue: false,
  client: { public: true },
  async decide() {
    // Enable when we have community submissions
    return process.env.ENABLE_SHOWCASE === "true";
  },
});
