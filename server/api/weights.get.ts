import { Weight } from "~/types";

export default defineEventHandler(async () => {
  const db = useDatabase();

  await db.sql`CREATE TABLE IF NOT EXISTS weights("id" INTEGER PRIMARY KEY, "user" TEXT, weight REAL, date TEXT)`;
  await db.sql`INSERT INTO weights(user, weight, date) VALUES ('Alex', 152, ${new Date().toUTCString()})`;
  const { rows } = await db.sql`SELECT * from weights`;
  return rows as Weight[];
});
