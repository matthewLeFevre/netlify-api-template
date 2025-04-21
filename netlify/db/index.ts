import { drizzle as createDrizzleInstance } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const sqlite = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_TOKEN,
});
const db = createDrizzleInstance(sqlite);

export default db;
