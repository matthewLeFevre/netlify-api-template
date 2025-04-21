import type { Config } from "drizzle-kit";

export default {
  dialect: "turso",
  schema: "netlify/db/schema.ts",
  out: "netlify/db",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_TOKEN,
  },
} satisfies Config;
