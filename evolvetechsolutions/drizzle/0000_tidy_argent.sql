CREATE TABLE "leadsTable" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"role" varchar(32),
	"phone" varchar(16) NOT NULL,
	"email" varchar(64)
);
