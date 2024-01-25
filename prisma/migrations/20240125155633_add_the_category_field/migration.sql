/*
  Warnings:

  - You are about to drop the column `userId` on the `Categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "userId",
ADD COLUMN     "category" TEXT[];
