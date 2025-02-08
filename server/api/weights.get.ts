import { Weight } from "~/types";

export default defineEventHandler(async () => {
  const db = useDatabase();

  const { rows } = await db.sql`SELECT * from weights`;
  return (rows || []).map(row => ({
    ...row,
    date: new Date(row.date as string),
  })) as Weight[];
});
