import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const dbUrl = new URL(process.env.DATABASE_URL);
const poolConfig = {
  host: dbUrl.hostname,
  port: Number(dbUrl.port || 5432),
  database: dbUrl.pathname.replace(/^\//, ""),
  user: decodeURIComponent(dbUrl.username || ""),
  password: decodeURIComponent(dbUrl.password || ""),
};

if (dbUrl.searchParams.get("sslmode") === "require") {
  poolConfig.ssl = { rejectUnauthorized: false };
}

if (!poolConfig.user) {
  throw new Error("DATABASE_URL must include a database user");
}

const pool = new Pool(poolConfig);

export const query = (text, params) => pool.query(text, params);

export default pool;
