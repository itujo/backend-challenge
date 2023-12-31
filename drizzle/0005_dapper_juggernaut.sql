CREATE TABLE IF NOT EXISTS "bitcoin_balances" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"balance" numeric(19, 4) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bitcoin_balances" ADD CONSTRAINT "bitcoin_balances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
