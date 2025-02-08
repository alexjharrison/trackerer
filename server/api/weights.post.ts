import { Payload } from "~/types";

export default defineEventHandler<{ body: Payload }>(async event => {
  const { date, reading, user } = await readBody(event);
  const db = useDatabase();
  await db.sql`INSERT INTO weights(user, reading, date) VALUES (${user}, ${reading}, ${date})`;

  return true;
});
