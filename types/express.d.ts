import { drizzle } from "drizzle-orm/libsql";

declare global {
  namespace Express {
    interface Request {
      db: drizzle;
    }
  }
}
