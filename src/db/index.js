import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const poolConfig = {
  connectionString: databaseUrl,
};

if (/sslmode=require/i.test(databaseUrl)) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

export const query = (text, params) => pool.query(text, params);

export default pool;
