/*
  Warnings:

  - You are about to alter the column `grade` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "grade" SET DATA TYPE INTEGER;
