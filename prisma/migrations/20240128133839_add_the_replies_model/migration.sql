/*
  Warnings:

  - You are about to drop the column `replies` on the `Replies` table. All the data in the column will be lost.
  - You are about to drop the column `repliestoId` on the `Replies` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Replies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_repliestoId_fkey";

-- AlterTable
ALTER TABLE "Replies" DROP COLUMN "replies",
DROP COLUMN "repliestoId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "repliesContent" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
