import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const game = sqliteTable("example", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  count: integer("count").notNull().default(0),
  active: integer("active", { mode: "boolean" }).default(false),
});
