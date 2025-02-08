export default defineNitroPlugin(async nitro => {
  const db = useDatabase();
  await db.sql`CREATE TABLE IF NOT EXISTS weights("id" INTEGER PRIMARY KEY, "user" TEXT, reading REAL, date TEXT)`;
});
