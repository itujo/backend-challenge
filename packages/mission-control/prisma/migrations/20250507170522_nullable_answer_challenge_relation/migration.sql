-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_challengeId_fkey";

-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "challengeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
