import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const example = sqliteTable("example", {
  id: text("id").primaryKey().$defaultFn(() => "game-" + nanoid()),
  name: text("name").notNull(),
  count: integer("count").notNull().default(0),
  active: integer("active", { mode: "boolean" }).default(false),
});
