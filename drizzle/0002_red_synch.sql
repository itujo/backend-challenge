DO $$ BEGIN
 CREATE TYPE "transaction_type" AS ENUM('deposit', 'purchase', 'sale');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"transaction_type" "transaction_type" NOT NULL,
	"amount" numeric(19, 8) NOT NULL,
	"price_per_unit" numeric(19, 4),
	"total_value" numeric(19, 4) NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
