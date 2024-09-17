import "dotenv/config";
import { BooksTable, MembersTable, TransactionsTable } from "./schema";
import mysql from "mysql2/promise";
import { AppEnvs } from "../read-env";
import { drizzle } from "drizzle-orm/mysql2";

async function main() {
  const pool = mysql.createPool(AppEnvs.DATABASE_URL);

  const db = drizzle(pool);

  await db.insert(MembersTable).values({
    firstName: "Shashank",
    lastName: "Patel",
    email: "samplemail@gmail.com",
    phone: "8528528523",
    address: "",
    password: "",
    role: "user",
  });
  const user = await db.select().from(MembersTable);
  console.log(user);
}
main();
