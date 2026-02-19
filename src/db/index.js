import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;
let pool = null;
let poolInitError = null;

if (!databaseUrl) {
  poolInitError = new Error("DATABASE_URL is not set");
} else {
  try {
    const poolConfig = {
      connectionString: databaseUrl,
    };

    if (/sslmode=require/i.test(databaseUrl)) {
      poolConfig.ssl = { rejectUnauthorized: false };
    }

    pool = new Pool(poolConfig);
  } catch (err) {
    poolInitError = err;
  }
}

export const query = (text, params) => {
  if (!pool || poolInitError) {
    const err = new Error(
      `Database not configured correctly: ${poolInitError?.message || "Unknown error"}`
    );
    err.status = 500;
    throw err;
  }
  return pool.query(text, params);
};

export default pool;
