-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('Pending', 'Error', 'Done');

-- AlterTable
ALTER TABLE "challenges" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AnswerStatus" NOT NULL DEFAULT 'Pending',
    "grade" DECIMAL(1,1),

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
