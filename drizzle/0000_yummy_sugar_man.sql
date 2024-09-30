DO $$ BEGIN
 CREATE TYPE "public"."inviteStatus" AS ENUM('Accepted', 'Pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Issued', 'Pending', 'Returned', 'Rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"author" varchar(150) NOT NULL,
	"publisher" varchar(50) NOT NULL,
	"genre" varchar(31) NOT NULL,
	"isbnNo" varchar(31) NOT NULL,
	"pages" integer NOT NULL,
	"totalCopies" integer NOT NULL,
	"availableCopies" integer NOT NULL,
	"price" integer NOT NULL,
	"image" varchar(256),
	CONSTRAINT "books_isbnNo_unique" UNIQUE("isbnNo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"phone" bigint,
	"address" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"role" "role",
	"image" varchar(500),
	CONSTRAINT "members_phone_unique" UNIQUE("phone"),
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"department" varchar(255),
	"bio" text,
	"inviteStatus" "inviteStatus" DEFAULT 'Pending',
	"calendlyLink" varchar(512),
	CONSTRAINT "professors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookId" integer NOT NULL,
	"memberId" integer NOT NULL,
	"borrowDate" varchar(10),
	"dueDate" varchar(15),
	"status" "status" NOT NULL,
	"returnDate" varchar(10)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberId" integer NOT NULL,
	"refreshToken" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_refresh_tokens" ADD CONSTRAINT "user_refresh_tokens_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
