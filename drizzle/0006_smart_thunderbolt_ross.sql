ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE numeric(19, 8);--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "price_per_unit" SET DATA TYPE numeric(19, 8);--> statement-breakpoint
ALTER TABLE "bitcoin_balances" ALTER COLUMN "balance" SET DATA TYPE numeric(19, 8);