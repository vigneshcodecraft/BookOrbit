// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// import { AppEnvs } from "../read-env";
// export function getDrizzleDB() {
//   const pool = mysql.createPool(AppEnvs.DATABASE_URL);
//   const db = drizzle(pool);
//   return db;
// }

import "@/drizzle/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });
