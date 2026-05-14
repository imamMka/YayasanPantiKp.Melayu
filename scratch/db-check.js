const { Client } = require('pg');
require('dotenv').config();

async function checkDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to DB");

    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Gallery';
    `);

    console.log("Gallery columns:", res.rows.map(r => r.column_name));

    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log("Tables in public schema:", tables.rows.map(r => r.table_name));

  } catch (err) {
    console.error("DB check failed:", err.message);
  } finally {
    await client.end();
  }
}

checkDb();
