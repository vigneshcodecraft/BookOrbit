import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const BooksTable = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publisher: varchar("publisher", { length: 50 }).notNull(),
  genre: varchar("genre", { length: 31 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 31 }).unique().notNull(),
  pages: integer("pages").notNull(),
  totalCopies: integer("totalCopies").notNull(),
  availableCopies: integer("availableCopies").notNull(),
  price: integer("price").notNull(),
  image: varchar("image", { length: 256 }),
});

export const RoleEnum = pgEnum("role", ["admin", "user"]);
export const MembersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phone: bigint("phone", { mode: "number" }).unique(),
  address: varchar("address", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  role: RoleEnum("role"),
  image: varchar("image", { length: 500 }),
});

export const UserRefreshTokensTable = pgTable("user_refresh_tokens", {
  id: serial("id").primaryKey(),
  memberId: integer("memberId")
    .references(() => MembersTable.id)
    .notNull(),
  refreshToken: varchar("refreshToken", { length: 255 }).notNull(),
});

export const StatusENum = pgEnum("status", [
  "Issued",
  "Pending",
  "Returned",
  "Rejected",
]);
export const TransactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookId: integer("bookId")
    .notNull()
    .references(() => BooksTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  memberId: integer("memberId")
    .notNull()
    .references(() => MembersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  borrowDate: varchar("borrowDate", { length: 10 }),
  dueDate: varchar("dueDate", { length: 15 }),
  status: StatusENum("status").notNull(),
  returnDate: varchar("returnDate", { length: 10 }),
});

export const ProfessorsTable = pgTable("professors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  calendlyLink: varchar("calendlyLink", { length: 512 }).notNull(),
});

// import {
//   bigint,
//   int,
//   mysqlEnum,
//   mysqlTable,
//   serial,
//   varchar,
// } from "drizzle-orm/mysql-core";

// export const BooksTable = mysqlTable("books", {
//   id: serial("id").primaryKey().autoincrement(),
//   title: varchar("title", { length: 100 }).notNull(),
//   author: varchar("author", { length: 150 }).notNull(),
//   publisher: varchar("publisher", { length: 50 }).notNull(),
//   genre: varchar("genre", { length: 31 }).notNull(),
//   isbnNo: varchar("isbnNo", { length: 31 }).unique().notNull(),
//   pages: int("pages").notNull(),
//   totalCopies: int("totalCopies").notNull(),
//   availableCopies: int("availableCopies").notNull(),
//   price: int("price").notNull(),
//   image: varchar("image", { length: 256 }),
// });

// export const MembersTable = mysqlTable("members", {
//   id: serial("id").primaryKey().autoincrement(),
//   firstName: varchar("firstName", { length: 50 }).notNull(),
//   lastName: varchar("lastName", { length: 50 }).notNull(),
//   phone: bigint("phone", { mode: "number" }).unique(),
//   address: varchar("address", { length: 100 }).notNull(),
//   password: varchar("password", { length: 100 }).notNull(),
//   email: varchar("email", { length: 100 }).unique().notNull(),
//   role: mysqlEnum("role", ["admin", "user"]).default("user"),
//   image: varchar("image", { length: 500 }),
// });

// export const userRefreshTokens = mysqlTable("userRefreshTokens", {
//   id: serial("id").primaryKey(),
//   memberId: int("memberId")
//     .references(() => MembersTable.id)
//     .notNull(),
//   refreshToken: varchar("refreshToken", { length: 255 }).notNull(),
// });

// export const TransactionsTable = mysqlTable("transactions", {
//   id: serial("id").primaryKey().autoincrement(),
//   bookId: int("bookId")
//     .notNull()
//     .references(() => BooksTable.id, {
//       onDelete: "cascade",
//       onUpdate: "cascade",
//     }),
//   memberId: int("memberId")
//     .notNull()
//     .references(() => MembersTable.id, {
//       onDelete: "cascade",
//       onUpdate: "cascade",
//     }),
//   borrowDate: varchar("borrowDate", { length: 10 }),
//   dueDate: varchar("dueDate", { length: 15 }),
//   status: mysqlEnum("status", ["Issued", "Pending", "Returned", "Rejected"])
//     .default("Pending")
//     .notNull(),
//   returnDate: varchar("returnDate", { length: 10 }),
// });
