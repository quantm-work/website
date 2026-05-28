import { Pool } from "pg";

let pool: Pool | undefined;

export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URI ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("Set DATABASE_URI or DATABASE_URL");
  }
  return url;
}

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: getDatabaseUrl() });
  }
  return pool;
}
